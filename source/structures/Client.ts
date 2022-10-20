import Cache from './Cache.js';
import Error from './Error.js';

import { CacheKey, CacheValue } from '../types/Cache.js';

export default class extends Cache {

    /**
     * Create a cache entry
     */
    async create (

        key:   CacheKey,
        value: CacheValue,

        force?: boolean
    ) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'undefined')

            throw new Error('Invalid entry value');

        if (!force && this.__has(key))

            throw new Error('Entry already exists');

        return this.__set(key, value);
    };

    /**
     * Bulk create entries in the cache
     */
    bulkCreate (

        keys:  CacheKey[],
        value: CacheValue,

        force?: boolean
    ) {

        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.create(key, value, force)));
    };

    /**
     * Modify a cache entry
     */
    async modify (

        key:   CacheKey,
        value: CacheValue,

        force?: boolean
    ) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'undefined')

            throw new Error('Invalid entry value');

        if (!force && !this.__has(key))

            throw new Error('Entry does not exist');

        return this.__set(key, value);
    };

    /**
     * Bulk modify entries in the cache
     */
    bulkModify (

        keys:  CacheKey[],
        value: CacheValue,

        force?: boolean
    ) {

        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.modify(key, value, force)));
    };

    /**
     * Clone a cache entry
     */
    async clone (

        from: CacheKey,
        key:  CacheKey,

        force?: boolean
    ) {

        if (typeof from !== 'string'
        &&  typeof from !== 'number'
        &&  typeof from !== 'bigint'
        &&  typeof from !== 'symbol'

        &&  typeof key  !== 'string'
        &&  typeof key  !== 'number'
        &&  typeof key  !== 'bigint'
        &&  typeof key  !== 'symbol')

            throw new Error('Invalid entry key');

        const value = this.__get(from);

        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'undefined')

            throw new Error('Invalid entry value');

        if (!force && this.__has(key))

            throw new Error('Entry already exists');

        return this.__set(key, value);
    };

    /**
     * Bulk clone entries in the cache
     */
    bulkClone (

        from: CacheKey,
        keys: CacheKey[],

        force?: boolean
    ) {

        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.clone(from, key, force)));
    };

    /**
     * Destroy a cache entry
     */
    async destroy (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        return this.__delete(key);
    };

    /**
     * Bulk destroy entries in the cache
     */
    bulkDestroy (keys: CacheKey[]) {

        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.destroy(key)));
    };

    /**
     * Check a cache entry
     */
    async check (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        return this.__has(key);
    };

    /**
     * Bulk check entries existence in the cache
     */
    bulkCheck (keys: CacheKey[]) {

        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.check(key)));
    };

    /**
     * Fetch a cache entry
     */
    async fetch (key: CacheKey) {

        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        return this.__get(key);
    };

    /**
     * Bulk fetch entries in the cache
     */
    bulkFetch (keys: CacheKey[]) {

        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.fetch(key)));
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
