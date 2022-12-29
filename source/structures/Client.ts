import Cache from './Cache.js';

import { CacheKey, CacheValue } from '../types/Cache.js';

export default class extends Cache {

    /**
     * Set a cache entry
     */
    async set (

        key:   CacheKey,
        value: CacheValue
    ) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key', { cause: 'invalidKey' });

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'undefined')

            throw new Error('Invalid entry value', { cause: 'invalidValue' });

        return this.__set(key, value);
    };

    /**
     * Clone a cache entry
     */
    async clone (

        from: CacheKey,
        key:  CacheKey
    ) {

        if (typeof from !== 'string'
        &&  typeof from !== 'number'
        &&  typeof from !== 'bigint'
        &&  typeof from !== 'symbol'

        &&  typeof key  !== 'string'
        &&  typeof key  !== 'number'
        &&  typeof key  !== 'bigint'
        &&  typeof key  !== 'symbol')

            throw new Error('Invalid entry key', { cause: 'invalidKey' });

        const value = this.__get(from);

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'undefined')

            throw new Error('Invalid entry value', { cause: 'invalidValue' });

        return this.__set(key, value);
    };

    /**
     * Delete a cache entry
     */
    async delete (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key', { cause: 'invalidKey' });

        return this.__delete(key);
    };

    /**
     * Has a cache entry
     */
    async has (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key', { cause: 'invalidKey' });

        return this.__has(key);
    };

    /**
     * Get a cache entry
     */
    async get (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key', { cause: 'invalidKey' });

        return this.__get(key);
    };

    /**
     * Return all cache entries
     */
    async all () {

        return this.__entries();
    };

    /**
     * Return keys of all cache entries
     */
    async keys () {

        return this.__keys();
    };

    /**
     * Return values of all cache entries
     */
    async values () {

        return this.__values();
    };

    /**
     * Clear cache entries
    */
    async clear () {

        return this.__clear();
    };

    /**
     * Return cache size
     */
    size () {

        return this.__size();
    };
};
