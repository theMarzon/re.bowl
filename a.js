import ReBowl from './library/source/index.js';

const cache = new ReBowl();

await cache.create('A', 'Hello world');

// await cache.create('A', 'Bye world');
// await cache.bulkCreate([ 'A', 'B' ], 'Bye world');

await cache.modify('A', 'Bye world');

console.log(cache);
