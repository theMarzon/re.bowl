import { describe, it, expect } from 'vitest';

import ReBowl from '../source/structures/Base.js';

describe('.size() method', () => {

    it('Getting database size', () => {

        expect(
            
            (() => {

                const cache = new ReBowl();
            
                return cache.size();
            })()
        )
            .toBeTypeOf('number');
    });
});
