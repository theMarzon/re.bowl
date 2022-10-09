import crypto from 'node:crypto';

export default function (

    value:     any,
    algorithm: string,

    encoding: crypto.BinaryToTextEncoding
) {

    return [
        
        typeof value,
    
        crypto
            .createHash(algorithm)
            .update(String(value))
            .digest(encoding)
    ]
        .join('@');
};
