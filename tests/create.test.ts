import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('.create() method', () => {

    it('Creating one entry', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();

                await cache.create('A', 'Hello world');
            })()
        )
            .toBeUndefined();
    });
});
