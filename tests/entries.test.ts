import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('.entries() method', () => {

    it('Create and get multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');
            
                return cache.entries();
            })()
        )
            .toBeInstanceOf(Map);
    });
});
