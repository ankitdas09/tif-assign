"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSignedInError = void 0;
const custom_error_1 = require("./custom-error");
class NotSignedInError extends custom_error_1.CustomError {
    constructor() {
        super("not signed in error");
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotSignedInError.prototype);
    }
    serializeError() {
        return [
            {
                message: "You need to sign in to proceed.",
                code: "NOT_SIGNEDIN",
            },
        ];
    }
}
exports.NotSignedInError = NotSignedInError;
