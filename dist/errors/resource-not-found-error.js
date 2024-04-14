"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class ResourceNotFoundError extends custom_error_1.CustomError {
    constructor(errors) {
        super("resource error");
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
    }
    serializeError() {
        return this.errors.map((error) => {
            return {
                param: error.param,
                message: error.message,
                code: "RESOURCE_NOT_FOUND"
            };
        });
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
