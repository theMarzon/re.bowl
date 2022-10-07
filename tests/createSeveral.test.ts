import { describe, it, expect } from 'vitest';

import ReBowl from '../source/structures/Base.js';

describe('.createSeveral() method', () => {

    it('Create multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');
            })()
        )
            .toBeUndefined();
    });
});
