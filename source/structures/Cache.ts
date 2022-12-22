import hashAlgorithm from '../utils/hashAlgorithm.js';

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

            throw new Error('Invalid hash algorithm', { cause: 'invalidAlgorithm' });
    };

    protected __set (

        key:   CacheKey,
        value: CacheValue
    ) {

        const containerHash = this.options.hashAlgorithm(value, 'sha1', 'hex');

        // Reutiliza el contenedor si ya existe
        const createdContainer: CachedContainer = this.containers.get(containerHash) ?? {

            value,

            usedBy: 0
        };

        createdContainer.usedBy++;

        const usedContainer = this.pointers.get(key);

        // Evita los contenedores colgantes al re-escribir un puntero
        if (usedContainer) {

            const cachedContainer = this.containers.get(usedContainer) as CachedContainer;

            if (usedContainer !== containerHash) {

                cachedContainer.usedBy--;

                if (!cachedContainer.usedBy)

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

        cachedContainer.usedBy--;

        // Si el contenedor ya no se utiliza
        if (!cachedContainer.usedBy)

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

        const cachedEntries: Map<CacheKey, CacheValue> = new Map();

        for (const [ pointer, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            cachedEntries.set(pointer, cachedContainer.value);
        };

        return cachedEntries;
    };

    protected __keys () {

        const cachedKeys: Set<CacheKey> = new Set();

        for (const [ pointer ] of this.pointers)

            cachedKeys.add(pointer);

        return cachedKeys;
    };

    protected __values () {

        const cachedValues: Set<CacheValue> = new Set();

        for (const [ , container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            cachedValues.add(cachedContainer.value);
        };

        return cachedValues;
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
