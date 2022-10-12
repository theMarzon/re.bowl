import crypto from 'node:crypto';

const hashAlgorithm = function (

    value,
    algorithm,
    encoding
) {

    const hash = crypto
        .createHash(algorithm)
        .update(String(value))
        .digest(encoding);

    return `${ typeof value }:${ hash }`;
};

const pointers   = new Map();
const containers = new Map();

const CACHE = {

    create ({ key, value, editable }) {

        const container = hashAlgorithm(value, 'sha1', 'hex');

        const createdPointer = {

            editable,

            containerUsed: container
        };

        // Reutiliza el contenedor si ya existe
        const createdContainer = containers.get(container) ?? {

            value,

            usedBy: 0
        };

        createdContainer.usedBy++;

        const cachedPointer = pointers.get(key);

        // Si el puntero ya existia
        if (cachedPointer) {

            if (

                // Si el puntero no es editable
                !cachedPointer.editable
            )

                throw new Error('Non-editable entry');

            // Evita los contenedores colgantes al re-escribir un puntero
            if (

                // Si los contenedores no son iguales
                cachedPointer.containerUsed !== container
            )

                containers.delete(cachedPointer.containerUsed);
        };

        pointers.set(key, createdPointer);
        containers.set(container, createdContainer);
    }
};

CACHE.create({

    key: 'TEST_KEY',

    value: 'TEST_VALUE_A',

    editable: false
});

CACHE.create({

    key: 'TEST_KEY',

    value: 'TEST_VALUE_B',

    editable: true
});

console.log(pointers);
console.log(containers);
