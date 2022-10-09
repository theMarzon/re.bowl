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

    options: Required<CacheOptions>;

    constructor (

        options?: CacheOptions
    ) {

        // Prepara las opciones
        this.options = {

            hashAlgorithm: options?.hashAlgorithm ?? hashAlgorithm
        };

        // Comprueba si las opciones son correctas
        if (typeof this.options.hashAlgorithm !== 'function')

            throw new Error('Invalid hash algorithm');
    };

    __set (

        key:   ValidKey,
        value: ValidValue
    ) {

        const container = this.options.hashAlgorithm(value, 'sha1', 'hex');

        let createdContainer = this.containers.get(container) as CachedContainer;

        // Si el contenedor no existe, lo crea
        createdContainer ??= {

            value,

            for: 0
        };

        createdContainer.for++;

        // Elimina el contenedor del puntero si no es utilizado
        const cachedContainer = this.pointers.get(key) as CachedPointer;

        if (cachedContainer !== container)

            this.containers.delete(cachedContainer);

        this.pointers.set(key, container);
        this.containers.set(container, createdContainer);
    };

    __delete (

        key: ValidKey
    ) {

        const container = this.pointers.get(key);

        // Si el contenedor no existe
        if (!container)

            return;

        this.pointers.delete(key);

        const cachedContainer = this.containers.get(container) as CachedContainer;

        // Resta el puntero eliminado
        cachedContainer.for--;

        // Si el contenedor ya no se utiliza
        if (!cachedContainer.for)

            this.containers.delete(container);

        else

            this.containers.set(container, cachedContainer);
    };

    __get (

        key: ValidKey
    ) {

        const container = this.pointers.get(key);

        // Si el contenedor no existe
        if (!container)

            return null;

        const cachedContainer = this.containers.get(container) as CachedContainer;

        return cachedContainer.value;
    };

    __has (

        key: ValidKey
    ) {

        const container = this.pointers.get(key);

        // Si el contenedor no existe
        if (!container)

            return false;

        return this.containers.has(container);
    };

    __entries () {

        const entries: Map<ValidKey, ValidValue> = new Map();

        for (const [ pointer, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            entries.set(pointer, cachedContainer.value);
        };

        return entries;
    };

    __keys () {

        const keys: Set<ValidKey> = new Set();

        for (const [ pointer ] of this.pointers) {

            keys.add(pointer);
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
