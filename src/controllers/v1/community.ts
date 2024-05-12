import express from "express";
import { TypedRequest } from "../../server";
import { JsonResponse } from "../../universe/v1/libraries/buildResponse";
import { Community } from "../../schema/v1/community";
import { v4 as uuidv4 } from "uuid";
import { Member } from "../../schema/v1/member.model";
import { Role } from "../../schema/v1/role.model";
import { ResourceNotFoundError } from "../../universe/v1/errors/resource-not-found-error";
import CommunityService from "../../services/v1/community";
import RoleService from "../../services/v1/role";
import MemberService from "../../services/v1/member";

interface CreateBody {
    name: string;
}

export async function CommunityCreate(
    req: TypedRequest<{}, CreateBody>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;

    const newCommunity = await CommunityService.Create({
        name: body.name,
        slug: `${body.name.toLowerCase()}${uuidv4()}`,
        owner: req.user!.id,
    });

    let role;
    let adminRole = await RoleService.GetAdmin();
    if (!adminRole) {
        const newRole = await RoleService.CreateAdmin();
        role = newRole;
    } else {
        role = adminRole;
    }

    const newMember = await MemberService.Create({
        community: newCommunity._id,
        user: req.user!.id,
        role: role._id,
    });

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: { ...newCommunity.toJSON() },
    });
}

interface CommunityGetAllQuery {
    [page: string]: string;
}

export async function CommunityGetAll(
    req: TypedRequest<CommunityGetAllQuery, {}>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    const totalDocs = await CommunityService.GetCount();

    const communities = await CommunityService.GetPage({}, page);

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: communities,
        meta: {
            total: totalDocs,
            pages: Math.ceil(totalDocs / 10),
            page: page,
        },
    });
}
export async function CommunityGetAllMembers(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { id } = req.params;

    let page = parseInt(req.query.page as string);
    if (!page) page = 1;

    try {
        const validCommunity = await CommunityService.GetById(id);
        if (!validCommunity)
            return next(
                new ResourceNotFoundError([{ param: "community", message: "Community not found." }])
            );
    } catch (error) {
        return next(
            new ResourceNotFoundError([{ param: "community", message: "Community not found." }])
        );
    }

    const totalDocs = await MemberService.GetCount({ community: id });
    const members = await Member.find({ community: id })
        .limit(10)
        .skip((page - 1) * 10)
        .sort({ createdAt: -1 })
        .populate("user", "-email -createdAt")
        .populate("role", "-createdAt -updatedAt");

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: members,
        meta: {
            total: totalDocs,
            pages: Math.ceil(totalDocs / 10),
            page: page,
        },
    });
}

interface CommunityGetOwnedQuery {
    [page: string]: string;
}

export async function CommunityGetOwned(
    req: TypedRequest<CommunityGetOwnedQuery, {}>,
    res: express.Response,
    next: express.NextFunction
) {
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    const totalDocs = await Community.countDocuments({ owner: req.user!.id });
    const communities = await Community.find({ owner: req.user!.id });

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: communities,
        meta: {
            total: totalDocs,
            pages: Math.ceil(totalDocs / 10),
            page: page,
        },
    });
}
interface CommunityGetJoinedQuery {
    [page: string]: string;
}

export async function CommunityGetJoined(
    req: TypedRequest<CommunityGetJoinedQuery, {}>,
    res: express.Response,
    next: express.NextFunction
) {
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    const members = await Member.find({ user: req.user!.id });
    const communityIds = members.map((m) => m.community);
    const communities = await Community.find({ _id: communityIds })
        .limit(10)
        .skip((page - 1) * 10)
        .populate("owner", "-email -createdAt");
    const totalDocs = await Community.countDocuments({ _id: communityIds });

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: communities,
        meta: {
            total: totalDocs,
            pages: Math.ceil(totalDocs / 10),
            page: page,
        },
    });
}
