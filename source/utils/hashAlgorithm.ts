import crypto from 'node:crypto';

import { CachedValue } from '../types/Cache.js';

export default function (

    value: CachedValue,

    algorithm: string,

    encoding: crypto.BinaryToTextEncoding
) {

    const hash = crypto
        .createHash(algorithm)
        .update(String(value))
        .digest(encoding);

    return `${ typeof value }:${ hash }`;
};
