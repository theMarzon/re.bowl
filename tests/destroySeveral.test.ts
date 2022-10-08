import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('.destroySeveral() method', () => {

    it('Create and destroy multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');
            
                await cache.destroySeveral([ 'A', 'E', 'I', 'O', 'U' ]);
            })()
        )
            .toBeUndefined();
    });
});
