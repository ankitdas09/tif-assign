"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAllowedError = void 0;
const custom_error_1 = require("./custom-error");
class NotAllowedError extends custom_error_1.CustomError {
    constructor() {
        super("credentials error");
        this.statusCode = 400;
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
exports.NotAllowedError = NotAllowedError;
