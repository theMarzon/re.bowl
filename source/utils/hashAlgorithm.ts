import crypto from 'node:crypto';

export default function (

    value:     any,
    algorithm: string,

    encoding: crypto.BinaryToTextEncoding
) {

    const hash = crypto
        .createHash(algorithm)
        .update(String(value))
        .digest(encoding);

    return `${typeof value}:${hash}`;
};
