export abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeError(): { param?: string; message: string; code: string }[];
}
