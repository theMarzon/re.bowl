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

        // Reutiliza el contenedor si existe
        const cachedContainer: CachedContainer = this.containers.get(containerHash) ?? { value, usedBy: 0 };

        cachedContainer.usedBy++;

        // Evita los contenedores colgantes al modificar un puntero
        const usedContainer = this.pointers.get(key);

        if (usedContainer) {

            // Obtiene el antiguo contenedor utilizado por el puntero
            const cachedOldContainer = this.containers.get(usedContainer) as CachedContainer;

            if (usedContainer !== containerHash) {

                cachedOldContainer.usedBy--;

                if (!cachedOldContainer.usedBy)

                    this.containers.delete(usedContainer);
            };
        };

        // Crea o modifca los punteros y contenedores
        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, cachedContainer);
    };

    protected __delete (key: ValidKey) {

        const containerHash = this.pointers.get(key);

        if (!containerHash)

            return;

        this.pointers.delete(key);

        // Elimina el contenedor si ya no es utilizado
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

        const returnedEntries: Map<ValidKey, ValidValue> = new Map();

        for (const [ key, container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            returnedEntries.set(key, cachedContainer.value);
        };

        return returnedEntries;
    };

    protected __keys () {

        const returnedKeys: Set<ValidKey> = new Set();

        for (const [ key ] of this.pointers)

            returnedKeys.add(key);

        return returnedKeys;
    };

    protected __values () {

        const returnedValues: Set<ValidValue> = new Set();

        for (const [ , container ] of this.pointers) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            returnedValues.add(cachedContainer.value);
        };

        return returnedValues;
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
