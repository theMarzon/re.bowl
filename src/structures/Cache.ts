import hashAlgorithm from '../utils/hashAlgorithm.js';

import {

    CacheKey,
    CacheValue,
    PointersCache,
    ContainersCache,
    CachedContainer,
    ContainerHash
} from '../types/Cache.js';

export default class {

    pointers:   PointersCache   = new Map();
    containers: ContainersCache = new Map();

    set (key: CacheKey, value: CacheValue) {

        const containerHash: ContainerHash = hashAlgorithm(value);

        const cachedContainer: CachedContainer = this.containers.get(containerHash) ?? { value, usedBy: 0 };

        cachedContainer.usedBy++;

        // Evita los contenedores colgantes al modificar un puntero
        const oldContainerHash = this.pointers.get(key) as ContainerHash;

        if (oldContainerHash) {

            // Obtiene el antiguo contenedor utilizado por el puntero
            const oldCachedContainer = this.containers.get(oldContainerHash) as CachedContainer;

            if (oldContainerHash !== containerHash) {

                oldCachedContainer.usedBy--;

                if (!oldCachedContainer.usedBy) this.containers.delete(oldContainerHash);
            };
        };

        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, cachedContainer);
    };

    delete (key: CacheKey) {

        const containerHash = this.pointers.get(key) as ContainerHash;

        if (!containerHash) return;

        this.pointers.delete(key);

        // Verifica si el contenedor aun es utilizado
        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        cachedContainer.usedBy--;

        if   (!cachedContainer.usedBy) this.containers.delete(containerHash);
        else                           this.containers.set(containerHash, cachedContainer);
    };

    get (key: CacheKey) {

        const containerHash = this.pointers.get(key) as ContainerHash;

        if (!containerHash) return null;

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        return cachedContainer.value;
    };

    has (key: CacheKey) {

        const containerHash = this.pointers.get(key) as ContainerHash;

        if (!containerHash) return false;

        return this.containers.has(containerHash);
    };

    entries () {

        const allEntries: Map<CacheKey, CacheValue> = new Map();

        for (const [ key, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            allEntries.set(key, cachedContainer.value);
        };

        return allEntries;
    };

    keys () {

        const allKeys: Set<CacheKey> = new Set();

        for (const [ key ] of this.pointers) {

            allKeys.add(key);
        };

        return allKeys;
    };

    values () {

        const allValues: Set<CacheValue> = new Set();

        for (const [ , container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            allValues.add(cachedContainer.value);
        };

        return allValues;
    };

    clear () {

        this.pointers.clear();
        this.containers.clear();
    };

    size () {

        return this.pointers.size
             + this.containers.size;
    };
};
