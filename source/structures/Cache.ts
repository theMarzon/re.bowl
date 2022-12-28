import hashAlgorithm from '../utils/hashAlgorithm.js';

import { ValidKey, ValidValue } from '../types/Client.js';

import {

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

        key:   ValidKey,
        value: ValidValue
    ) {

        const containerHash = this.options.hashAlgorithm(value, 'sha1', 'hex');

        const cachedContainer: CachedContainer = this.containers.get(containerHash) ?? { value, usedBy: 0 };

        cachedContainer.usedBy++;

        // Evita los contenedores colgantes al modificar un puntero
        const oldContainerHash = this.pointers.get(key);

        if (oldContainerHash) {

            // Obtiene el antiguo contenedor utilizado por el puntero
            const oldCachedContainer = this.containers.get(oldContainerHash) as CachedContainer;

            if (oldContainerHash !== containerHash) {

                oldCachedContainer.usedBy--;

                if (!oldCachedContainer.usedBy)

                    this.containers.delete(oldContainerHash);
            };
        };

        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, cachedContainer);
    };

    protected __delete (key: ValidKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash)

            return;

        this.pointers.delete(key);

        // Verifica si el contenedor aun es utilizado
        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        cachedContainer.usedBy--;

        if (!cachedContainer.usedBy)

            this.containers.delete(containerHash);

        else

            this.containers.set(containerHash, cachedContainer);
    };

    protected __get (key: ValidKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash)

            return null;

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        return cachedContainer.value;
    };

    protected __has (key: ValidKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash)

            return false;

        return this.containers.has(containerHash);
    };

    protected __entries () {

        const allEntries: Map<ValidKey, ValidValue> = new Map();

        for (const [ key, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            allEntries.set(key, cachedContainer.value);
        };

        return allEntries;
    };

    protected __keys () {

        const allKeys: Set<ValidKey> = new Set();

        for (const [ key ] of this.pointers)

            allKeys.add(key);

        return allKeys;
    };

    protected __values () {

        const allValues: Set<ValidValue> = new Set();

        for (const [ , container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            allValues.add(cachedContainer.value);
        };

        return allValues;
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
