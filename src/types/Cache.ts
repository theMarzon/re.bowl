import hashAlgorithm from '../utils/hashAlgorithm.js';

import { ValidKey, ValidValue } from './Client.js';

export type ContainerHash = string;

export type PointersCache = Map<ValidKey, CachedPointer>;

export type ContainersCache = Map<ContainerHash, CachedContainer>;

export type CachedPointer = ContainerHash;

export interface CachedContainer {

    usedBy: number

    value: ValidValue
};

export interface CacheOptions { hashAlgorithm?: typeof hashAlgorithm };
