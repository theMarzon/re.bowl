export type ContainerHash = string;

export type ValidKey = string | number | symbol | bigint;

export type ValidValue = string | number | symbol | bigint | boolean | undefined;

export type PointersCache = Map<ValidKey, PointerData>;

export type ContainersCache = Map<ContainerHash, ContainerData>;

export type PointerData = ContainerHash;

export interface ContainerData {

    usedBy: number

    value: ValidValue
};
