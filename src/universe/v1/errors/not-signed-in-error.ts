import { CustomError } from "./custom-error";

export class NotSignedInError extends CustomError {
    statusCode = 401;
    constructor() {
        super("not signed in error");
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
