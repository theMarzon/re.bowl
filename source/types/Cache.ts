import hashAlgorithm from '../utils/hashAlgorithm.js';

export type CacheKey = string | number | symbol | bigint;

export type CacheValue = string | number | symbol | bigint | boolean | undefined;

export type ContainerHash = string;

export type PointersCache = Map<CacheKey, CachedPointer>;

export type ContainersCache = Map<ContainerHash, CachedContainer>;

export type CachedPointer = ContainerHash;

export interface CachedContainer {

    for: number

    value: CacheValue
};

export interface CacheOptions {

    hashAlgorithm?: typeof hashAlgorithm
};
