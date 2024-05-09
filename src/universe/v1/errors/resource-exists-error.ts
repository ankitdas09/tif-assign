import { CustomError } from "./custom-error";

export class ResourceExistsError extends CustomError {
    statusCode = 400;
    constructor(public errors: [{ param: string; message: string }]) {
        super("resource error");
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
