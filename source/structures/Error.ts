export default class extends Error {

    constructor (

        message: string,

        options?: ErrorOptions
    ) {

        super (

            message,

            { cause: options?.cause ?? message.length }
        );
    };
};
