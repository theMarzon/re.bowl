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
