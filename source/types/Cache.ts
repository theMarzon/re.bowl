import hashAlgorithm from '../utils/hashAlgorithm.js';

export type CachedKey = string | number | symbol | bigint;

export type CachedValue = string | number | symbol | bigint | boolean | undefined;

export type ContainerHash = string;

export type PointersCache = Map<CachedKey, CachedPointer>;

export type ContainersCache = Map<ContainerHash, CachedContainer>;

export type CachedPointer = ContainerHash;

export interface CachedContainer {

    for: number,

    value: CachedValue
};

export interface CacheOptions {

    hashAlgorithm?: typeof hashAlgorithm
};
