import { describe, it, expect } from 'vitest';

import ReBowl from '../source/structures/Base.js';

describe('.entriesValue() method', () => {

    it('Create and get value on multiple entries', async () => {

        expect(
            
            await (async () => {

                const cache = new ReBowl();
            
                await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');
            
                return cache.entriesValue();
            })()
        )
            .toBeInstanceOf(Set);
    });
});
