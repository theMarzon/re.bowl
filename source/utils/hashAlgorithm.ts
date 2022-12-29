import { CacheValue } from '../types/Cache.js';

export default function (value: CacheValue) {

    const characters = String(value);

    const base = 17;

    let hash = 0;

    for (let char = 0; char < characters.length; char++)

        hash += characters.charCodeAt(char) * (base ** char);

    return `${ typeof value }::${ hash }`.toUpperCase();
};
