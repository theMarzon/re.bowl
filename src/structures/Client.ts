import Cache from './Cache.js';

import { CacheKey, CacheValue } from '../types/Cache.js';

export default class {

    private readonly cache = new Cache();

    /**
     * Set a cache entry
     */
    set (key: CacheKey, value: CacheValue) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'undefined') throw new Error('Invalid entry value');

        this.cache.set(key, value);
    };

    /**
     * Clone a cache entry
     */
    clone (from: CacheKey, key: CacheKey) {

        if (typeof from !== 'string'
        &&  typeof from !== 'number'
        &&  typeof from !== 'bigint'
        &&  typeof from !== 'symbol'

        &&  typeof key  !== 'string'
        &&  typeof key  !== 'number'
        &&  typeof key  !== 'bigint'
        &&  typeof key  !== 'symbol')  throw new Error('Invalid entry key');

        const value = this.cache.get(from);

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'undefined') throw new Error('Invalid entry value');

        this.cache.set(key, value);
    };

    /**
     * Delete a cache entry
     */
    delete (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        this.cache.delete(key);
    };

    /**
     * Get a cache entry
     */
    get (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        return this.cache.get(key);
    };

    /**
     * Has a cache entry
     */
    has (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol') throw new Error('Invalid entry key');

        return this.cache.has(key);
    };

    /**
     * Return all cache entries
     */
    entries () {

        return this.cache.entries();
    };

    /**
     * Return keys of all cache entries
     */
    keys () {

        return this.cache.keys();
    };

    /**
     * Return values of all cache entries
     */
    values () {

        return this.cache.values();
    };

    /**
     * Clear cache entries
    */
    clear () {

        this.cache.clear();
    };

    /**
     * Return cache data
     */
    data () {

        return this.cache.data();
    };

    /**
     * Return cache size
     */
    size () {

        return this.cache.size();
    };
};
