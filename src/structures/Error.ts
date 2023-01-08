import { ErrorCode } from '../types/Error.js';

export default class extends Error {

    code: number;

    constructor (message: string, options: ErrorOptions & { code: ErrorCode }) {

        super (message, options);

        this.code = options.code;
    };
};
