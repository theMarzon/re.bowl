import { describe, it, expect } from 'vitest';

import ReBowl from '../src/index.js';

describe('Code test', () => {

    it('Set entry', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');
                }
            )()
        )
            .toBeUndefined();
    });

    it('Set and clone entry', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    cache.clone('A', 'B');
                }
            )()
        )
            .toBeUndefined();
    });

    it('Set and delete entry', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    cache.delete('A');
                }
            )()
        )
            .toBeUndefined();
    });

    it('Set and get entry', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    return cache.get('A');
                }
            )()
        )
            .toBe('Hello world');
    });

    it('Set and has entry', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    return cache.has('A');
                }
            )()
        )
            .toBe(true);
    });

    it('Set and get all entries', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    return cache.entries();
                }
            )()
        )
            .toStrictEqual([ [ 'A', 'Hello world' ] ]);
    });

    it('Set and get all entries key', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    return cache.keys();
                }
            )()
        )
            .toStrictEqual([ 'A' ]);
    });

    it('Set and get all entries value', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    return cache.values();
                }
            )()
        )
            .toStrictEqual([ 'Hello world' ]);
    });

    it('Set and get entries data', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    return cache.data();
                }
            )()
        )
            .toBeTypeOf('object');
    });

    it('Set and get entries size', () => {

        expect(

            (
                () => {

                    const cache = new ReBowl();

                    cache.set('A', 'Hello world');

                    return cache.size();
                }
            )()
        )
            .toBe(2);
    });
});
