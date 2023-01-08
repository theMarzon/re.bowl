import hashAlgorithm from '../utils/hashAlgorithm.js';

import {

    CacheKey,
    CacheValue,
    PointersCache,
    ContainersCache,
    ContainerData
} from '../types/Cache.js';

export default class {

    private readonly pointers:   PointersCache   = new Map();
    private readonly containers: ContainersCache = new Map();

    set (key: CacheKey, value: CacheValue) {

        const currentContainerHash = hashAlgorithm(value);

        const currentContainerData: ContainerData = this.containers.get(currentContainerHash) ?? { value, usedBy: 0 };

        currentContainerData.usedBy++;

        const previousContainerHash = this.pointers.get(key);

        // Verifica si el contenedor anterior del puntero existente es el mismo
        if (previousContainerHash
        &&  previousContainerHash !== currentContainerHash) {

            // Obtiene el antiguo contenedor utilizado por el puntero
            const previousContainerData = this.containers.get(previousContainerHash) as ContainerData;

            previousContainerData.usedBy--;

            // Elimina el contenedor si ya no es utilizado
            if (!previousContainerData.usedBy) this.containers.delete(previousContainerHash);
        };

        this.pointers.set(key, currentContainerHash);
        this.containers.set(currentContainerHash, currentContainerData);
    };

    delete (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        // Verifica si el puntero existe
        if (!containerHash) return;

        this.pointers.delete(key);

        const containerData = this.containers.get(containerHash) as ContainerData;

        containerData.usedBy--;

        // Elimina el contenedor si ya no es utilizado o lo actualiza
        if   (!containerData.usedBy) this.containers.delete(containerHash);
        else                         this.containers.set(containerHash, containerData);
    };

    get (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        // Verifica si el puntero existe
        if (!containerHash) return null;

        const containerData = this.containers.get(containerHash) as ContainerData;

        return containerData.value;
    };

    has (key: CacheKey) {

        const containerHash = this.pointers.get(key);

        // Verifica si el puntero existe
        if (!containerHash) return false;

        return this.containers.has(containerHash);
    };

    entries () {

        const data: Array<[ CacheKey, CacheValue ]> = new Array(this.pointers.size);

        let index = 0;

        for (const [ key, containerHash ] of this.pointers) {

            const containerData = this.containers.get(containerHash) as ContainerData;

            data[index] = [ key, containerData.value ];

            index++;
        };

        return data;
    };

    keys () {

        const data: CacheKey[] = new Array(this.pointers.size);

        let index = 0;

        for (const [ key ] of this.pointers) {

            data[index] = key;

            index++;
        };

        return data;
    };

    values () {

        const data: CacheValue[] = new Array(this.containers.size);

        let index = 0;

        for (const [ , containerData ] of this.containers) {

            data[index] = containerData.value;

            index++;
        };

        return data;
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
