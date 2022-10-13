import crypto from 'node:crypto';

import { CacheValue } from '../types/Cache.js';

export default function (

    value: CacheValue,

    algorithm: string,

    encoding: crypto.BinaryToTextEncoding
) {

    return `${ typeof value }:${

        crypto
            .createHash(algorithm)
            .update(String(value))
            .digest(encoding)
    }`;
};
