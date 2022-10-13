import { describe, bench } from 'vitest';

import ReBowl from '../source/index.js';

describe('Code benchmark', () => {

    bench('Create one entry', async () => {

        const cache = new ReBowl();

        await cache.create('A', 'Hello world');
    });

    bench('Create multiple entries', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');
    });

    bench('Create and clone one entry', async () => {

        const cache = new ReBowl();

        await cache.create('A', 'Hello world');

        await cache.clone('A', 'E');
    });

    bench('Create and clone multiple entries', async () => {

        const cache = new ReBowl();

        await cache.create('A', 'Hello world');

        await cache.cloneSeveral('A', [ 'E', 'I', 'O', 'U' ]);
    });

    bench('Create and destroy one entry', async () => {

        const cache = new ReBowl();

        await cache.create('A', 'Hello world');

        await cache.destroy('A');
    });

    bench('Create and destroy multiple entries', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O', 'U' ], 'Hello world');

        await cache.destroySeveral([ 'A', 'E', 'I', 'O', 'U' ]);
    });

    bench('Create and check one entry', async () => {

        const cache = new ReBowl();

        await cache.create('A', 'Hello world');

        await cache.check('A');
    });

    bench('Create and check multiple entries', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');

        await cache.checkSeveral([ 'A', 'E', 'I', 'O', 'U' ]);
    });

    bench('Create and fetch one entry', async () => {

        const cache = new ReBowl();

        await cache.create('A', 'Hello world');

        await cache.fetch('A');
    });

    bench('Create and fetch multiple entries', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');

        await cache.fetchSeveral([ 'A', 'E', 'I', 'O', 'U' ]);
    });

    bench('Create multiple entries and fetch entries data', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');

        await cache.all();
    });

    bench('Create multiple entries and fetch entries key', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');

        await cache.keys();
    });

    bench('Create multiple entries and fetch entries value', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');

        await cache.values();
    });

    bench('Create multiple entries and clear database entries', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');

        await cache.clear();
    });

    bench('Create multiple entries and fetch database size', async () => {

        const cache = new ReBowl();

        await cache.createSeveral([ 'A', 'E', 'I', 'O' ], 'Hello world');

        cache.size();
    });
});
