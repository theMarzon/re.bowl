import Error from './Error.js';
import Cache from './Cache.js';

import { 

    ValidKey,
    ValidValue
} from '../types/Client.js';

export default class extends Cache {

    /**
     * Create a one entry in the database
     */
    async create (

        key:   ValidKey,
        value: ValidValue
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        // Si el valor de la entrada no es un String, Number, BigInt, Boolean, Symbol o Undefined
        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'undefined')

            throw new Error('Invalid entry value');

        return this.__set(key, value);
    };

    /**
     * Create a several entries in the database
     */
    createSeveral (

        keys:  ValidKey[],
        value: ValidValue
    ) {

        // Si el nombre de las entradas no es un Array
        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.create(key, value)));
    };

    /**
     * Destroy a one entry in the database
     */
    async destroy (

        key: ValidKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        return this.__delete(key);
    };

    /**
     * Destroy a several entries in the database
     */
    destroySeveral (

        keys: ValidKey[]
    ) {

        // Si el nombre de las entradas no es un Array
        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.destroy(key)));
    };

    /**
     * Find one entry in the database
     */
    async find (

        key: ValidKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        return this.__get(key);
    };

    /**
     * Find several entries in the database
     */
    findSeveral (

        keys: ValidKey[]
    ) {

        // Si el nombre de las entradas no es un Array
        if (!Array.isArray(keys)) 

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.find(key)));
    };

    /**
     * Check a entry existence in the database
     */
    async check (

        key: ValidKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        return this.__has(key);
    };

    /**
     * Check several entries existence in the database
     */
    checkSeveral (

        keys: ValidKey[]
    ) {

        // Si el nombre de las entradas no es un Array
        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.check(key)));
    };

    /**
     * Clone a one entry in the database
     */
    async clone (

        key:  ValidKey,
        from: ValidKey
    ) {

        // Si el nombre de la entrada no es un String, Number, BigInt o Symbol
        if (typeof key !== 'string'
        &&  typeof key !== 'number'
        &&  typeof key !== 'bigint'
        &&  typeof key !== 'symbol')

            throw new Error('Invalid entry key');

        const value = this.__get(from);

        // Si el valor de la entrada no es un String, Number, BigInt, Boolean, Symbol o Undefined
        if (typeof value !== 'string'
        &&  typeof value !== 'number'
        &&  typeof value !== 'bigint'
        &&  typeof value !== 'boolean'
        &&  typeof value !== 'symbol'
        &&  typeof value !== 'undefined')

            throw new Error('Invalid entry value');

        return this.__set(key, value);
    };
    
    /**
     * Clone a several entries in the database
     */
    cloneSeveral (
    
        keys: ValidKey[],
        from: ValidKey
    ) {

        // Si el nombre de las entradas no es un Array
        if (!Array.isArray(keys))

            throw new Error('Invalid entry keys');

        return Promise.all(keys.map((key) => this.clone(key, from)));
    };

    /**
     * Return all entries in the database
     */
    async entries () {

        return this.__entries();
    };

    /**
     * Return all entries key in the database
     */
    async entriesKey () {

        return this.__keys();
    };

    /**
     * Return all entries value in the database
     */
    async entriesValue () {

        return this.__values();
    };

    /**
     * Destroy all entries in the database
    */    
    async clean () {

        return this.__clear();
    };

    /**
     * Return database size
     */
    size () {

        return this.__size();
    };
};
