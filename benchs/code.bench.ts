import { describe, bench } from 'vitest';

import ReBowl from '../src/index.js';

describe('Code test', () => {

    bench('Set entry', () => {

        const cache = new ReBowl();

        cache.set('A', 'Hello world');
    });

    bench('Set and clone entry', () => {

        const cache = new ReBowl();

        cache.set('A', 'Hello world');

        cache.clone('A', 'B');
    });

    bench('Set and delete entry', () => {

        const cache = new ReBowl();

        cache.set('A', 'Hello world');

        cache.delete('A');
    });

    bench('Set and has entry', () => {

        const cache = new ReBowl();

        cache.set('A', 'Hello world');

        cache.has('A');
    });

    bench('Set and get entry', () => {

        const cache = new ReBowl();

        cache.set('A', 'Hello world');

        cache.get('A');
    });

    bench('Set and get entries size', () => {

        const cache = new ReBowl();

        cache.set('A', 'Hello world');

        cache.size();
    });
});
