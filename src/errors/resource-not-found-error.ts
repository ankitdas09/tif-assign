import { CustomError } from "./custom-error";

export class ResourceNotFoundError extends CustomError {
    statusCode = 400;
    constructor(public errors: [{ param: string; message: string }]) {
        super("resource error");
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
