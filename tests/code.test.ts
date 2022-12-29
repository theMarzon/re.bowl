import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe('Code test', () => {

    it('Set entry', async () => {

        expect(

            await (

                () => {

                    const cache = new ReBowl();

                    void cache.set('A', 'Hello world');
                    void cache.set('B', 'Hello world');
                    void cache.set('C', 'Hello world');

                    console.log(cache.containers);
                    console.log(cache.pointers);
                }
            )()
        )
            .toBe(undefined);
    });

    it('Set and clone entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.set('A', 'Hello world');

                    return cache.clone('A', 'B');
                }
            )()
        )
            .toBe(undefined);
    });

    it('Set and delete entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.set('A', 'Hello world');

                    return cache.delete('A');
                }
            )()
        )
            .toBe(undefined);
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

    it('Get entries size', async () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    return cache.size();
                }
            )()
        )
            .toBe(0);
    });
});
