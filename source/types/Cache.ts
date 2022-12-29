import hashAlgorithm from '../utils/hashAlgorithm.js';

export type CacheKey = string | number | symbol | bigint;

export type CacheValue = string | number | symbol | bigint | boolean | undefined;

export type PointersCache = Map<CacheKey, CachedPointer>;

export type ContainersCache = Map<string, CachedContainer>;

export type CachedPointer = string;

export interface CachedContainer {

    usedBy: number

    value: CacheValue
};

export interface CacheOptions { hashAlgorithm?: typeof hashAlgorithm };
