import { Request, Response, NextFunction } from "express";
import { NotSignedInError } from "../errors/not-signed-in-error";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        throw new NotSignedInError();
    }
    next();
}
