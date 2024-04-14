import express from "express";
import { User } from "../models/user.model";
import { TypedRequest } from "..";
import bcrypt from "bcrypt";
import { ResourceExistsError } from "../errors/resource-exists-error";
import { JsonResponse } from "../utils/buildResponse";
import { Token } from "../utils/token";
import { OtherCustomError } from "../errors/other-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface SignupBody {
    name: string;
    email: string;
    password: string;
}

export async function AuthSignup(
    req: TypedRequest<{}, SignupBody>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        return next(
            new ResourceExistsError([
                { param: "email", message: "User with this email address already exists." },
            ])
        );
    }

    const hashed = bcrypt.hashSync(body.password, 10);
    const newUser = User.build({ name: body.name, email: body.email, password: hashed });
    await newUser.save();
    const access_token = Token.signJWT(newUser._id, newUser.email);

    return JsonResponse(res, {
        statusCode: 201,
        status: true,
        data: { ...newUser.toJSON() },
        meta: { access_token },
    });
}

interface SigninBody {
    email: string;
    password: string;
}

export async function AuthSignin(
    req: TypedRequest<{}, SigninBody>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;
    const existingUser = await User.findOne({ email: body.email });
    if (!existingUser) {
        return next(new InvalidCredentialsError());
    }

    const isPassCorrect = bcrypt.compareSync(body.password, existingUser.password);
    if (!isPassCorrect) {
        return next(new InvalidCredentialsError());
    }

    const access_token = Token.signJWT(existingUser._id, existingUser.email);

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: { ...existingUser.toJSON() },
        meta: { access_token },
    });
}

export async function AuthMe(
    req: TypedRequest<{}, SigninBody>,
    res: express.Response,
    next: express.NextFunction
) {
    const existingUser = await User.findOne({email: req.user?.email})
    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: { ...existingUser?.toJSON() },
        meta: {},
    });
}
