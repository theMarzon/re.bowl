import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('Getting', () => {

    it('Create and get multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');

                    return cache.entries();
                })()
        )
            .toBeInstanceOf(Map);
    });

    it('Create and get key on multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');

                    return cache.keys();
                })()
        )
            .toBeInstanceOf(Set);
    });

    it('Create and get value on multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');

                    return cache.values();
                })()
        )
            .toBeInstanceOf(Set);
    });

    it('Get database size', () => {

        expect(

            (
 
                () => {

                    const cache = new ReBowl();

                    return cache.size();
                })()
        )
            .toBeTypeOf('number');
    });
});
