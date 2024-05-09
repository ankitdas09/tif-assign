import { CustomError } from "./custom-error";

export class InvalidCredentialsError extends CustomError {
    statusCode = 400;
    constructor() {
        super("credentials error");
        Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
    }
    serializeError() {
        return [
            {
                param: "password",
                message: "The credentials you provided are invalid.",
                code: "INVALID_CREDENTIALS",
            },
        ];
    }
}
