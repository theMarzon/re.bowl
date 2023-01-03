import { ErrorCodes } from '../types/Error.js';

export default class extends Error {

    code: ErrorCodes;

    constructor (code: ErrorCodes) {

        super ();

        switch (code) {

            case ErrorCodes.InvalidEntry:

                this.message = 'Invalid entry key or value';

                break;

            case ErrorCodes.InvalidOption:

                this.message = 'Invalid option value';

                break;
        };

        this.code = code;
    };
};
