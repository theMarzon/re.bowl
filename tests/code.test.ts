import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('Code test', () => {

    it('Set entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.set('A', 'Hello world');
                }
            )()
        )
            .toBeUndefined();
    });

    it('Set and clone entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.set('A', 'Hello world');

                    await cache.clone('A', 'E');
                }
            )()
        )
            .toBeUndefined();
    });

    it('Set and delete entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.set('A', 'Hello world');

                    await cache.delete('A');
                }
            )()
        )
            .toBeUndefined();
    });

    it('Set and has entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.set('A', 'Hello world');

                    return cache.has('A');
                }
            )()
        )
            .toBe(true);
    });

    it('Set and get entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.set('A', 'Hello world');

                    return cache.get('A');
                }
            )()
        )
            .toBe('Hello world');
    });
});
