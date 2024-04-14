import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import dotenv from 'dotenv';
import { AuthRouter } from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error-handler";
import { Query } from 'express-serve-static-core';
import mongoose from "mongoose";
import { CommunityRouter } from "./routes/community.routes";
import { RoleRouter } from "./routes/role.routes";
import { MemberRouter } from "./routes/member.routes";

export interface TypedRequest<T extends Query, U> extends Express.Request {
    body: U,
    query: T
}

dotenv.config();

export const config = {
    jwtSecret : process.env.JWT_SECRET!
}

const app = express();
app.use(express.json())

app.use("/v1", AuthRouter)
app.use("/v1", CommunityRouter)
app.use("/v1", RoleRouter)
app.use("/v1", MemberRouter)
app.use(errorHandler)

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("[SUCCESS] DB CONNECTED!")
        app.listen(process.env.PORT, () => {
            console.log("Started on PORT", process.env.PORT)
        })
    } catch (error) {
        console.log("[ERROR] DB CONN FAILED!")
    }
}

start()

