export default class extends Error {

    code: number;

    constructor (

        message: string,

        options?: ErrorOptions
    ) {

        super (

            message,
            options
        );

        this.code = message.length;
    };
};
