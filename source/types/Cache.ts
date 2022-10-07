import crypto from 'node:crypto';

import {
    
    ValidKey,
    ValidValue
} from './Base.js';

export type ContainerHash = string;

export type PointersCache = Map<ValidKey, CachedPointer>;

export type ContainersCache = Map<ContainerHash, CachedContainer>;

export type CachedPointer = ContainerHash;

export interface CachedContainer {

    for: number,

    value: ValidValue
};

export interface CacheOptions {

    hash?: {

        algorithm?: string,

        encoding?: crypto.BinaryToTextEncoding
    }
};
