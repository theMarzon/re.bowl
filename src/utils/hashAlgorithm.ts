import { ValidValue } from '../types/Cache.js';

export default (value: ValidValue) => {

    const hasher = (from: string) => {

        const limit = Number.MAX_SAFE_INTEGER;

        const base = 17;

        let hash = 0;

        for (let char = 0; char < from.length; char++) {

            hash += from.charCodeAt(char) * (base ** char);
        };

        return hash % limit;
    };

    return `${ typeof value }:${

        typeof value === 'undefined'

            ? '*'

            : typeof value === 'boolean'

                ? Number(value)

                : typeof value === 'symbol'

                    ? value.description

                        ? hasher(value.description)

                        : '*'

                    : hasher(String(value))
    }`
        .toUpperCase();
};
