export type ContainerHash = string;

export type CacheKey = string | number | symbol | bigint;

export type CacheValue = string | number | symbol | bigint | boolean | undefined;

export type PointersCache = Map<CacheKey, PointerData>;

export type ContainersCache = Map<ContainerHash, ContainerData>;

export type PointerData = ContainerHash;

export interface ContainerData {

    usedBy: number

    value: CacheValue
};
