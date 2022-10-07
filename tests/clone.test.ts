import { describe, it, expect } from 'vitest';

import ReBowl from '../source/structures/Base.js';

describe('.clone() method', () => {

    it('Create and clone one entry', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
                
                await cache.create('A', 'Hello world');
                
                await cache.clone('E', 'A');
            })()
        )
            .toBeUndefined();
    });
});
