"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).json({
            status: false,
            errors: err.serializeError(),
        });
    }
    return res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong", param: "Server Error" }],
    });
};
exports.errorHandler = errorHandler;
