import Cache from './Cache.js';
import Error from './Error.js';

import {

    CacheKey,
    CacheValue
} from '../types/Cache.js';

export default class extends Cache {

    /**
     * Create a one entry in the database
     */
    async create (

        key:   CacheKey,
        value: CacheValue
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (

            typeof key !== 'string'
         && typeof key !== 'number'
         && typeof key !== 'bigint'
         && typeof key !== 'symbol'
        )

            throw new Error('Invalid entry key');

        // Si el valor de la entrada no es un String, Number, BigInt, Boolean, Symbol o Undefined
        if (

            typeof value !== 'string'
         && typeof value !== 'number'
         && typeof value !== 'bigint'
         && typeof value !== 'boolean'
         && typeof value !== 'symbol'
         && typeof value !== 'undefined'
        )

            throw new Error('Invalid entry value');

        return this.__set(key, value);
    };

    /**
     * Create a several entries in the database
     */
    createSeveral (

        keys:  CacheKey[],
        value: CacheValue
    ) {

        if (

            // Si el nombre de las entradas no es una matriz
            !Array.isArray(keys)
        )

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.create(key, value)));
    };

    /**
     * Clone a one entry in the database
     */
    async clone (

        from: CacheKey,
        key:  CacheKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (

            typeof from !== 'string'
         && typeof from !== 'number'
         && typeof from !== 'bigint'
         && typeof from !== 'symbol'

         && typeof key  !== 'string'
         && typeof key  !== 'number'
         && typeof key  !== 'bigint'
         && typeof key  !== 'symbol'
        )

            throw new Error('Invalid entry key');

        const value = this.__get(from);

        // Si el valor de la entrada no es un String, Number, BigInt, Boolean, Symbol o Undefined
        if (

            typeof value !== 'string'
         && typeof value !== 'number'
         && typeof value !== 'bigint'
         && typeof value !== 'boolean'
         && typeof value !== 'symbol'
         && typeof value !== 'undefined'
        )

            throw new Error('Invalid entry value');

        return this.__set(key, value);
    };
    
    /**
     * Clone a several entries in the database
     */
    cloneSeveral (
    
        from: CacheKey,
        keys: CacheKey[]
    ) {

        if (

            // Si el nombre de las entradas no es una matriz
            !Array.isArray(keys)
        )

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.clone(from, key)));
    };

    /**
     * Destroy a one entry in the database
     */
    async destroy (

        key: CacheKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (

            typeof key !== 'string'
         && typeof key !== 'number'
         && typeof key !== 'bigint'
         && typeof key !== 'symbol'
        )

            throw new Error('Invalid entry key');

        return this.__delete(key);
    };

    /**
     * Destroy a several entries in the database
     */
    destroySeveral (

        keys: CacheKey[]
    ) {

        if (

            // Si el nombre de las entradas no es una matriz
            !Array.isArray(keys)
        )

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.destroy(key)));
    };

    /**
     * Check a entry existence in the database
     */
    async check (

        key: CacheKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (

            typeof key !== 'string'
         && typeof key !== 'number'
         && typeof key !== 'bigint'
         && typeof key !== 'symbol'
        )

            throw new Error('Invalid entry key');

        return this.__has(key);
    };

    /**
     * Check several entries existence in the database
     */
    checkSeveral (

        keys: CacheKey[]
    ) {

        if (

            // Si el nombre de las entradas no es una matriz
            !Array.isArray(keys)
        )

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.check(key)));
    };

    /**
     * Fetch one entry in the database
     */
    async fetch (

        key: CacheKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (

            typeof key !== 'string'
         && typeof key !== 'number'
         && typeof key !== 'bigint'
         && typeof key !== 'symbol'
        )

            throw new Error('Invalid entry key');

        return this.__get(key);
    };

    /**
     * Fetch several entries in the database
     */
    fetchSeveral (

        keys: CacheKey[]
    ) {

        if (

            // Si el nombre de las entradas no es una matriz
            !Array.isArray(keys)
        ) 

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.fetch(key)));
    };

    /**
     * Return all entries in the database
     */
    async all () {

        return this.__entries();
    };

    /**
     * Return all entries key in the database
     */
    async keys () {

        return this.__keys();
    };

    /**
     * Return all entries value in the database
     */
    async values () {

        return this.__values();
    };

    /**
     * Destroy all entries in the database
    */    
    async clear () {

        return this.__clear();
    };

    /**
     * Return database size
     */
    size () {

        return this.pointers.size
             + this.containers.size;
    };
};
