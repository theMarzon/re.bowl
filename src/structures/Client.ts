import Cache from './Cache.js';

import { ValidKey, ValidValue } from '../types/Client.js';

export default class extends Cache {

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

        this.__set(key, value);
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

        const value = this.__get(from);

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'undefined') throw new Error('Invalid entry value');

        this.__set(key, value);
    };

    /**
     * Delete a cache entry
     */
    delete (key: ValidKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol'
        &&  typeof key !== 'bigint') throw new Error('Invalid entry key');

        this.__delete(key);
    };

    /**
     * Has a cache entry
     */
    has (key: ValidKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol'
        &&  typeof key !== 'bigint') throw new Error('Invalid entry key');

        return this.__has(key);
    };

    /**
     * Get a cache entry
     */
    get (key: ValidKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'symbol'
        &&  typeof key !== 'bigint') throw new Error('Invalid entry key');

        return this.__get(key);
    };

    /**
     * Return all cache entries
     */
    all () {

        return this.__all();
    };

    /**
     * Return keys of all cache entries
     */
    keys () {

        return this.__keys();
    };

    /**
     * Return values of all cache entries
     */
    values () {

        return this.__values();
    };

    /**
     * Clear cache entries
    */
    clear () {

        this.__clear();
    };

    /**
     * Return cache size
     */
    size () {

        return this.pointers.size
             + this.containers.size;
    };
};
