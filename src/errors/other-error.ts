import { CustomError } from "./custom-error";

export class OtherCustomError extends CustomError {
    statusCode = 400;
    constructor(public errors: [{ param: string; message: string; code: string }]) {
        super("other custom error");
        Object.setPrototypeOf(this, OtherCustomError.prototype);
    }
    serializeError() {
        return this.errors.map((error) => {
            return {
                param: error.param,
                message: error.message,
                code: error.code,
            };
        });
    }
}
