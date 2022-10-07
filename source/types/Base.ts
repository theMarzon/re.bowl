import { CacheOptions } from './Cache.js';

export type ValidKey = string | number | symbol | bigint;

export type ValidValue = string | number | symbol | bigint | boolean | undefined;

export interface BaseOptions extends CacheOptions {};
