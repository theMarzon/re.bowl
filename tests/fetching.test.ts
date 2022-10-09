import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('Fetching', () => {

    it('Create and find multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');
            
                return cache.fetchSeveral([ 'A', 'E', 'I', 'O', 'U' ]);
            })()
        )
            .toBeTypeOf('object');
    });
});