import { Request, Response, NextFunction } from "express";
import { config } from "../../../server";
import { Token } from "../libraries/token";

export interface UserDecoded {
    id: string;
    email: string;
}
declare global {
    namespace Express {
        interface Request {
            user?: UserDecoded;
        }
    }
}

export async function currentUser(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        return next();
    }
    try {
        const decoded = Token.verifyJWT(req.headers.authorization.split(" ")[1]);
        req.user = decoded
        // req.currentUser = { id: resp.data._id, email: resp.data.outlookEmail };
    } catch (error) {
        // console.log("error from current-user middleware", error);
        return next();
    }
    return next();
}
