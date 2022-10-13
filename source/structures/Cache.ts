import hashAlgorithm from '../utils/hashAlgorithm.js';

import Error from './Error.js';

import {

    CachedKey,
    CachedValue,
    CacheOptions,
    PointersCache,
    ContainersCache,
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

        if (

            // Comprueba si el algoritmo es una funcion
            typeof this.options.hashAlgorithm !== 'function'
        )

            throw new Error('Invalid hash algorithm');
    };

    protected __set (

        key:   CachedKey,
        value: CachedValue
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

        if (usedContainer) {

            // Evita los contenedores colgantes al re-escribir un puntero
            if (

                // Si los contenedores no son iguales
                usedContainer !== containerHash
            )

                this.containers.delete(usedContainer);
        };

        this.pointers.set(key, containerHash);
        this.containers.set(containerHash, createdContainer);
    };

    protected __delete (

        key: CachedKey
    ) {

        const containerHash = this.pointers.get(key);

        if (

            // Si el contenedor no existe
            !containerHash
        )

            return;

        this.pointers.delete(key);

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        cachedContainer.for--;

        if (

            // Si el contenedor ya no se utiliza
            !cachedContainer.for
        )

            this.containers.delete(containerHash);

        else

            this.containers.set(containerHash, cachedContainer);
    };

    protected __get (

        key: CachedKey
    ) {

        const containerHash = this.pointers.get(key);

        if (

            // Si el contenedor no existe
            !containerHash
        )

            return null;

        const cachedContainer = this.containers.get(containerHash) as CachedContainer;

        return cachedContainer.value;
    };

    protected __has (

        key: CachedKey
    ) {

        const containerHash = this.pointers.get(key);

        if (

            // Si el contenedor no existe
            !containerHash
        )

            return false;

        return this.containers.has(containerHash);
    };

    protected __entries () {

        const entries: Map<CachedKey, CachedValue> = new Map();

        for (

            const [ pointer, container ] of this.pointers
        ) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            entries.set(pointer, cachedContainer.value);
        };

        return entries;
    };

    protected __keys () {

        const keys: Set<CachedKey> = new Set();

        for (

            const [ pointer ] of this.pointers
        )

            keys.add(pointer);

        return keys;
    };

    protected __values () {

        const values: Set<CachedValue> = new Set();

        for (

            const [ , container ] of this.pointers
        ) {

            const cachedContainer = this.containers.get(container) as CachedContainer;

            values.add(cachedContainer.value);
        };

        return values;
    };
 
    protected __clear () {

        this.pointers.clear();
        this.containers.clear();
    };
};
