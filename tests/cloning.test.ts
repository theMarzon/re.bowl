import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('Cloning', () => {

    it('Create and clone multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.createSeveral([ 'A', 'E', 'I' ], 'Hello world');
            
                await cache.cloneSeveral([ 'O', 'U' ], 'I');
            })()
        )
            .toBeUndefined();
    });
});