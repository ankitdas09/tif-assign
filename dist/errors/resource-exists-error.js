"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceExistsError = void 0;
const custom_error_1 = require("./custom-error");
class ResourceExistsError extends custom_error_1.CustomError {
    constructor(errors) {
        super("resource error");
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, ResourceExistsError.prototype);
    }
    serializeError() {
        return this.errors.map((error) => {
            return {
                param: error.param,
                message: error.message,
                code: "RESOURCE_EXISTS"
            };
        });
    }
}
exports.ResourceExistsError = ResourceExistsError;
