import crypto from 'node:crypto';

import {

    ValidKey,
    ValidValue
} from '../types/Base.js';

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

    protected __set (

        key:   ValidKey,
        value: ValidValue
    ) {

        const containerHash = crypto

            .createHash(this.options.hash.algorithm)
            .update(typeof value)
            .update(String(value))
            .digest(this.options.hash.encoding);

        let cachedContainer = this.containers.get(containerHash) as CachedContainer;

        // Si el contenedor no existe, lo crea
        cachedContainer ??= {

            value,

            for: 0
        };

        cachedContainer.for++;

        // Evita que al sobre-escribir un puntero, no se elimine un contenedor no utilizado
        if (this.pointers.has(key)) {

            const usedContainer = this.pointers.get(key) as CachedPointer;

            if (usedContainer !== containerHash)

                this.containers.delete(usedContainer);
        };

        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, cachedContainer);
    };

    protected __delete (

        key: ValidKey
    ) {

        const containerHash = this.pointers.get(key);

        // Si el contenedor no existe
        if (!containerHash)

            return;

        this.pointers.delete(key);

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        // Resta un 1 por el puntero eliminado
        cachedContainer.for--;

        // Si el contenedor ya no se utiliza
        if   (!cachedContainer.for) this.containers.delete(containerHash);
        else                        this.containers.set(containerHash, cachedContainer);
    };

    protected __get (

        key: ValidKey
    ) {

        const containerHash = this.pointers.get(key);

        // Si el contenedor no existe
        if (!containerHash)

            return null;

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        return cachedContainer.value;
    };

    protected __has (

        key: ValidKey
    ) {

        const containerHash = this.pointers.get(key);

        // Si el contenedor no existe
        if (!containerHash)

            return false;

        return this.containers.has(containerHash);
    };

    protected async __entries () {

        const entries: Map<ValidKey, ValidValue> = new Map();

        for (const [ key, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            entries.set(key, cachedContainer.value);
        };

        return entries;
    };

    protected __keys () {

        const keys: Set<ValidKey> = new Set();

        for (const [ key ] of this.pointers) {

            keys.add(key);
        };

        return keys;
    };

    protected __values () {

        const values: Set<ValidValue> = new Set();

        for (const [ , container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            values.add(cachedContainer.value);
        };

        return values;
    };
 
    protected __clear () {

        this.pointers.clear();
        this.containers.clear();
    };

    protected __size () {

        return this.pointers.size 
        +      this.containers.size;
    };
};
