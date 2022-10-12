import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

describe( 'Correct', () => {

    it( 'Create one entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.create( 'A', 'Hello world' );
                } )()
        )
            .toBeUndefined();
    } );

    it( 'Create multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O', 'U' ], 'Hello world' );
                } )()
        )
            .toBeUndefined();
    } );

    it( 'Create and destroy one entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.create( 'A', 'Hello world' );

                    await cache.destroy( 'A' );
                } )()
        )
            .toBeUndefined();
    } );

    it( 'Create and destroy multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O', 'U' ], 'Hello world' );

                    await cache.destroySeveral( [ 'A', 'E', 'I', 'O', 'U' ] );
                } )()
        )
            .toBeUndefined();
    } );

    it( 'Create and check one entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.create( 'A', 'Hello world' );

                    return cache.check( 'A' );
                } )()
        )
            .toBe( true );
    } );

    it( 'Create and check multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O' ], 'Hello world' );

                    return cache.checkSeveral( [ 'A', 'E', 'I', 'O', 'U' ] );
                } )()
        )
            .toStrictEqual( [

                true, true, true, true,

                false
            ] );
    } );

    it( 'Create and clone one entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.create( 'A', 'Hello world' );

                    await cache.clone( 'A', 'E' );
                } )()
        )
            .toBeUndefined();
    } );

    it( 'Create and clone multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.create( 'A', 'Hello world' );

                    await cache.cloneSeveral( 'A', [ 'E', 'I', 'O', 'U' ] );
                } )()
        )
            .toBeUndefined();
    } );

    it( 'Create and fetch one entry', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.create( 'A', 'Hello world' );

                    return cache.fetch( 'A' );
                } )()
        )
            .toBe( 'Hello world' );
    } );

    it( 'Create and fetch multiple entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O' ], 'Hello world' );

                    return cache.fetchSeveral( [ 'A', 'E', 'I', 'O', 'U' ] );
                } )()
        )
            .toStrictEqual( [

                'Hello world', 'Hello world', 'Hello world', 'Hello world', 

                null
            ] );
    } );

    it( 'Create multiple entries and fetch entries data', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O' ], 'Hello world' );

                    return cache.all();
                } )()
        )
            .instanceOf( Map );
    } );

    it( 'Create multiple entries and fetch entries key', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O' ], 'Hello world' );

                    return cache.keys();
                } )()
        )
            .instanceOf( Set );
    } );

    it( 'Create multiple entries and fetch entries value', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O' ], 'Hello world' );

                    return cache.values();
                } )()
        )
            .instanceOf( Set );
    } );

    it( 'Create multiple entries and clear database entries', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O' ], 'Hello world' );

                    await cache.clear();
                } )()
        )
            .toBeUndefined();
    } );

    it( 'Create multiple entries and fetch database size', async () => {

        expect(

            await (

                async () => {

                    const cache = new ReBowl();

                    await cache.createSeveral( [ 'A', 'E', 'I', 'O' ], 'Hello world' );

                    return cache.size();
                } )()
        )
            .toBeTypeOf( 'number' );
    } );

} );
