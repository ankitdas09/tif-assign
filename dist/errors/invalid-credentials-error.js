"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
const custom_error_1 = require("./custom-error");
class InvalidCredentialsError extends custom_error_1.CustomError {
    constructor() {
        super("credentials error");
        this.statusCode = 400;
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
exports.InvalidCredentialsError = InvalidCredentialsError;
