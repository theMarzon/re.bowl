import { ValidValue } from '../types/Client.js';

export default function (value: ValidValue) {

    const calculate = (characters: string) => {

        const base = 17;

        let hash = 0;

        for (let char = 0; char < characters.length; char++) {

            hash += characters.charCodeAt(char) * (base ** char);
        };

        return hash;
    };

    return `${ typeof value }:${

        typeof value === 'undefined'

            ? '*'

            : typeof value === 'boolean'

                ? Number(value)

                : typeof value === 'symbol'

                    ? value.description

                        ? calculate(value.description)

                        : '*'

                    : calculate(String(value))
    }`
        .toUpperCase();
};
