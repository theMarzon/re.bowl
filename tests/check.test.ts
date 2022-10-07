import { describe, it, expect } from 'vitest';

import ReBowl from '../source/structures/Base.js';

describe('.check() method', () => {

    it('Create and check multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.create('A', 'Hello world');
            
                return cache.check('A');
            })()
        )
            .toBe(true);
    });
});
