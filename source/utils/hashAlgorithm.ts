import crypto from 'node:crypto';

import { ValidValue } from '../types/Client.js';

export default function (

    value: ValidValue,

    algorithm: string,

    encoding: crypto.BinaryToTextEncoding
) {

    return `${ typeof value }:${

        crypto
            .createHash(algorithm)
            .update(String(value))
            .digest(encoding)
    }`
        .toUpperCase();
};
