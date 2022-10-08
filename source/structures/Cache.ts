import crypto from 'node:crypto';

import hashAlgorithm from '../utils/hashAlgorithm.js';

import Error from './Error.js';

import {

    ValidKey,
    ValidValue
} from '../types/Client.js';

import {

    CacheOptions,
    PointersCache,
    ContainersCache,
    CachedPointer,
    CachedContainer
} from '../types/Cache.js';

export default class {

    pointers:   PointersCache   = new Map();
    containers: ContainersCache = new Map();

    options: {

        hash: {

            algorithm: string,

            encoding: crypto.BinaryToTextEncoding
        }
    } = {

            hash: {

                algorithm: 'sha1',
                encoding:  'hex'
            }
        };

    constructor (

        options?: CacheOptions
    ) {

        // Prepara las opciones
        this.options.hash = {

            algorithm: options?.hash?.algorithm ?? this.options.hash.algorithm,
            encoding:  options?.hash?.encoding  ?? this.options.hash.encoding
        };

        // Comprueba si las opciones son correctas
        if (typeof this.options.hash.algorithm !== 'string')
        
            throw new Error('Invalid hash algorithm');

        if (typeof this.options.hash.encoding  !== 'string')

            throw new Error('Invalid hash encoding');
    };

    __set (

        key:   ValidKey,
        value: ValidValue
    ) {

        const containerHash = hashAlgorithm(

            value,

            this.options.hash.algorithm,
            this.options.hash.encoding
        );

        let createdContainer = this.containers.get(containerHash) as CachedContainer;

        // Si el contenedor no existe, lo crea
        createdContainer ??= {

            value,

            for: 0
        };

        createdContainer.for++;

        // Elimina el contenedor del puntero si no es utilizado
        const cachedContainer = this.pointers.get(key) as CachedPointer;

        if (cachedContainer !== containerHash)

            this.containers.delete(cachedContainer);

        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, createdContainer);
    };

    __delete (

        key: ValidKey
    ) {

        const containerHash = this.pointers.get(key);

        // Si el contenedor no existe
        if (!containerHash)

            return;

        this.pointers.delete(key);

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        // Resta el puntero eliminado
        cachedContainer.for--;

        // Si el contenedor ya no se utiliza
        if (!cachedContainer.for)

            this.containers.delete(containerHash);

        else

            this.containers.set(containerHash, cachedContainer);
    };

    __get (

        key: ValidKey
    ) {

        const containerHash = this.pointers.get(key);

        // Si el contenedor no existe
        if (!containerHash)

            return null;

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        return cachedContainer.value;
    };

    __has (

        key: ValidKey
    ) {

        const containerHash = this.pointers.get(key);

        // Si el contenedor no existe
        if (!containerHash)

            return false;

        return this.containers.has(containerHash);
    };

    async __entries () {

        const entries: Map<ValidKey, ValidValue> = new Map();

        for (const [ key, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            entries.set(key, cachedContainer.value);
        };

        return entries;
    };

    __keys () {

        const keys: Set<ValidKey> = new Set();

        for (const [ key ] of this.pointers) {

            keys.add(key);
        };

        return keys;
    };

    __values () {

        const values: Set<ValidValue> = new Set();

        for (const [ , container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            values.add(cachedContainer.value);
        };

        return values;
    };
 
    __clear () {

        this.pointers.clear();
        this.containers.clear();
    };

    __size () {

        return this.pointers.size 
        +      this.containers.size;
    };
};
