import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('.find() method', () => {

    it('Create and find one entry', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.create('A', 'Hello world');
            
                return cache.find('A');
            })()
        )
            .toBeDefined();
    });
});
