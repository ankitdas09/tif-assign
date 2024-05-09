import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import { AuthRouter } from "./api/v1/auth.routes";
import { errorHandler } from "./universe/v1/middlewares/error-handler";
import { Query } from "express-serve-static-core";
import mongoose from "mongoose";
import { CommunityRouter } from "./api/v1/community.routes";
import { RoleRouter } from "./api/v1/role.routes";
import { MemberRouter } from "./api/v1/member.routes";
import Logger from "./universe/v1/libraries/logger";
import FrameworkLoader from "./loaders/v1/framework";
import Env from "./loaders/v1/env";

export interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U;
    query: T;
}

dotenv.config();

export const config = {
    jwtSecret: process.env.JWT_SECRET!,
};

async function server() {
    const app = express();

    Env.Loader()
    Logger.Loader()
    FrameworkLoader(app)

    app.use(express.json());

    app.use("/v1", AuthRouter);
    app.use("/v1", CommunityRouter);
    app.use("/v1", RoleRouter);
    app.use("/v1", MemberRouter);

    app.use(errorHandler);

    try {
        await mongoose.connect(Env.variable.MONGO_URI);
        Logger.instance.info("DB CONNECTED!");
        // app.listen(process.env.PORT, () => {
        //     console.log("Started on PORT", process.env.PORT)
        // })
    } catch (error) {
        Logger.instance.error(error);
        process.exit(1);
    }
    return app;
}
// server()
export default server;
