import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super("validation error");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeError() {
        return this.errors.map((error) => {
            return {
                // @ts-expect-error
                param: error.path,
                message: error.msg,
                code: "INVALID_INPUT"
            };
        });
    }
}
