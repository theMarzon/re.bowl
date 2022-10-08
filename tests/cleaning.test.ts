import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('Cleaning', () => {

    it('Create and destroy multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');
            
                await cache.clean();
            })()
        )
            .toBeUndefined();
    });
});
