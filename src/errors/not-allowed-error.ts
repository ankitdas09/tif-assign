import { CustomError } from "./custom-error";

export class NotAllowedError extends CustomError {
    statusCode = 400;
    constructor() {
        super("credentials error");
        Object.setPrototypeOf(this, NotAllowedError.prototype);
    }
    serializeError() {
        return [
            {
                message: "You are not authorized to perform this action.",
                code: "NOT_ALLOWED_ACCESS",
            },
        ];
    }
}
