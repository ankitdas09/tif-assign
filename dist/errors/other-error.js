"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherCustomError = void 0;
const custom_error_1 = require("./custom-error");
class OtherCustomError extends custom_error_1.CustomError {
    constructor(errors) {
        super("other custom error");
        this.errors = errors;
        this.statusCode = 400;
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
exports.OtherCustomError = OtherCustomError;
