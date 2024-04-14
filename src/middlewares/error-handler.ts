import { CustomError } from "../errors/custom-error";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof CustomError) {
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
