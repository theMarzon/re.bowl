import Cache from './Cache.js';

import { ValidKey, ValidValue } from '../types/Cache.js';

export default class {

    cache = new Cache();

    /**
     * Set a cache entry
     */
    set (key: ValidKey, value: ValidValue) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol'
        &&  typeof key !== 'bigint') throw new Error('Invalid entry key');

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'undefined') throw new Error('Invalid entry value');

        this.cache.set(key, value);
    };

    /**
     * Clone a cache entry
     */
    clone (from: ValidKey, key: ValidKey) {

        if (typeof from !== 'string'
        &&  typeof from !== 'number'
        &&  typeof from !== 'symbol'
        &&  typeof from !== 'bigint'

        &&  typeof key  !== 'string'
        &&  typeof key  !== 'number'
        &&  typeof key  !== 'symbol'
        &&  typeof key  !== 'bigint') throw new Error('Invalid entry key');

        const value = this.cache.get(from);

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'undefined') throw new Error('Invalid entry value');

        this.cache.set(key, value);
    };

    /**
     * Delete a cache entry
     */
    delete (key: ValidKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol'
        &&  typeof key !== 'bigint') throw new Error('Invalid entry key');

        this.cache.delete(key);
    };

    /**
     * Get a cache entry
     */
    get (key: ValidKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol'
        &&  typeof key !== 'bigint') throw new Error('Invalid entry key');

        return this.cache.get(key);
    };

    /**
     * Has a cache entry
     */
    has (key: ValidKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol'
        &&  typeof key !== 'bigint') throw new Error('Invalid entry key');

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
     * Return cache size
     */
    size () {

        return this.cache.size();
    };
};
