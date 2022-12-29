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

        this.options = { hashAlgorithm: options?.hashAlgorithm ?? hashAlgorithm };

        if (typeof this.options.hashAlgorithm !== 'function') {

            throw new Error('Invalid hash algorithm', { cause: 'invalidAlgorithm' });
        };
    };

    protected __set (key: CacheKey, value: CacheValue) {

        const containerHash = this.options.hashAlgorithm(value);

        const cachedContainer: CachedContainer = this.containers.get(containerHash) ?? { value, usedBy: 0 };

        cachedContainer.usedBy++;

        // Evita los contenedores colgantes al modificar un puntero
        const oldContainerHash = this.pointers.get(key);

        if (oldContainerHash) {

            // Obtiene el antiguo contenedor utilizado por el puntero
            const oldCachedContainer = this.containers.get(oldContainerHash) as CachedContainer;

            if (oldContainerHash !== containerHash) {

                oldCachedContainer.usedBy--;

                if (!oldCachedContainer.usedBy) {

                    this.containers.delete(oldContainerHash);
                };
            };
        };

        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, cachedContainer);
    };

    protected __delete (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash) {

            return;
        };

        this.pointers.delete(key);

        // Verifica si el contenedor aun es utilizado
        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        cachedContainer.usedBy--;

        if (!cachedContainer.usedBy) {

            this.containers.delete(containerHash);
        } else {

            this.containers.set(containerHash, cachedContainer);
        };
    };

    protected __get (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash) {

            return null;
        };

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        return cachedContainer.value;
    };

    protected __has (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash) {

            return false;
        };

        return this.containers.has(containerHash);
    };

    protected __entries () {

        const cachedEntries: Map<CacheKey, CacheValue> = new Map();

        for (const [ key, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            cachedEntries.set(key, cachedContainer.value);
        };

        return cachedEntries;
    };

    protected __keys () {

        const cachedKeys: Set<CacheKey> = new Set();

        for (const [ key ] of this.pointers) {

            cachedKeys.add(key);
        };

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
