import { CacheValue } from '../types/Cache.js';

export default function (value: CacheValue) {

    const createHash = (characters: string) => {

        const base = 17;

        let hash = 0;

        for (let i = 0; i < characters.length; i++)

            hash += characters.charCodeAt(i) * (base ** i);

        return hash;
    };

    return `${ (typeof value).toUpperCase() }:${ createHash(String(value)) }`;
};
