import { describe, it, expect } from 'vitest';

import ReBowl from '../source/index.js';

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
