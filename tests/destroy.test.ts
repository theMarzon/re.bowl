import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('.destroy() method', () => {

    it('Create and destroy one entry', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.create('A', 'Hello world');
            
                await cache.destroy('A');
            })()
        )
            .toBeUndefined();
    });
});
