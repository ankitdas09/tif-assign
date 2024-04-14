import { TypedRequest } from "..";
import express from "express";
import { Role } from "../models/role.model";
import { JsonResponse } from "../utils/buildResponse";
import { ResourceExistsError } from "../errors/resource-exists-error";
interface RoleCreateBody {
    name: string;
}

export async function RoleCreate(
    req: TypedRequest<{}, RoleCreateBody>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;

    const existingRole = await Role.findOne({ name: body.name });
    if (existingRole) {
        return next(new ResourceExistsError([{ param: "name", message: "role already exists!" }]));
    }

    const newRole = Role.build({
        name: body.name,
        scopes: [],
    });
    await newRole.save();

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: { ...newRole.toJSON() },
    });
}

interface RoleGetAllQuery {
    [page: string]: string;
}

export async function RoleGetAll(
    req: TypedRequest<RoleGetAllQuery, {}>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    const totalDocs = await Role.countDocuments();

    const roles = await Role.find()
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ createdAt: -1 });

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: [roles],
        meta: {
            total: totalDocs,
            pages: Math.ceil(totalDocs / 10),
            page: page,
        },
    });
}
