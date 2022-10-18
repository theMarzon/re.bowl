import hashAlgorithm from '../utils/hashAlgorithm.js';

import Error from './Error.js';

import {

    CacheKey,
    CacheValue,
    CacheOptions,
    PointersCache,
    ContainersCache,
    CachedContainer
} from '../types/Cache.js';

export default class {

    pointers:   PointersCache   = new Map();
    containers: ContainersCache = new Map();

    options: Required<CacheOptions>;

    constructor (options?: CacheOptions) {

        this.options = {

            hashAlgorithm: options?.hashAlgorithm ?? hashAlgorithm
        };

        if (typeof this.options.hashAlgorithm !== 'function')

            throw new Error('Invalid hash algorithm');
    };

    protected __set (

        key:   CacheKey,
        value: CacheValue
    ) {

        const containerHash = this.options.hashAlgorithm(

            value,

            'sha1', 'hex'
        );

        // Reutiliza el contenedor si ya existe
        const createdContainer: CachedContainer = this.containers.get(containerHash) ?? {

            value,

            for: 0
        };

        createdContainer.for++;

        const usedContainer = this.pointers.get(key);

        // Evita los contenedores colgantes al re-escribir un puntero
        if (usedContainer) {

            const cachedContainer = this.containers.get(usedContainer) as CachedContainer;

            if (usedContainer !== containerHash) {

                cachedContainer.for--;

                if (!cachedContainer.for)

                    this.containers.delete(usedContainer);
            };
        };

        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, createdContainer);
    };

    protected __delete (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash)

            return;

        this.pointers.delete(key);

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        cachedContainer.for--;

        // Si el contenedor ya no se utiliza
        if (!cachedContainer.for)

            this.containers.delete(containerHash);

        else

            this.containers.set(containerHash, cachedContainer);
    };

    protected __get (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash)

            return null;

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        return cachedContainer.value;
    };

    protected __has (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash)

            return false;

        return this.containers.has(containerHash);
    };

    protected __entries () {

        const entries: Map<CacheKey, CacheValue> = new Map();

        for (const [ pointer, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            entries.set(pointer, cachedContainer.value);
        };

        return entries;
    };

    protected __keys () {

        const keys: Set<CacheKey> = new Set();

        for (const [ pointer ] of this.pointers)

            keys.add(pointer);

        return keys;
    };

    protected __values () {

        const values: Set<CacheValue> = new Set();

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
             + this.containers.size;
    };
};
