## Features

- ✍ Writted in **TypeScript**.

- ⚡️ Lightning fast.

- 🧵 Data compression.

- 🧘🏻 Human friendly.

- 📚 Zero dependencies.

- 📦 Optimized size.

## Documentation

### `.set(CacheKey, CacheValue): Promise<void>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.create('KEY', 'VALUE');
```

### `.clone(CacheKey, CacheKey): Promise<void>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.clone('KEY_A', 'KEY_B');
```

### `.delete(CacheKey): Promise<void>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.delete('KEY');
```

### `.has(CacheKey): Promise<boolean>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.has('KEY');
```

### `.get(CacheKey): Promise<CacheValue | null>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.get('KEY');
```

### `.all(): Promise<Map<CacheKey, CacheValue>>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.all();
```

### `.keys(): Promise<Set<CacheKey>>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.keys();
```

### `.values(): Promise<Set<CacheValue>>`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

await cache.values();
```

### `.size(): number`

```ts
import ReBowl from 're.bowl';

const cache = new ReBowl();

cache.size();
```

## Credits

Font used in the icon [here.](https://www.jetbrains.com/lp/mono)
