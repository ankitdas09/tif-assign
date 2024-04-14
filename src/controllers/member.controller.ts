import { TypedRequest } from "..";
import express from "express";
import { Role, RoleDoc } from "../models/role.model";
import { JsonResponse } from "../utils/buildResponse";
import { ResourceExistsError } from "../errors/resource-exists-error";
import mongoose from "mongoose";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Community } from "../models/community.model";
import { User } from "../models/user.model";
import { NotAllowedError } from "../errors/not-allowed-error";
import { Member } from "../models/member.model";
import { OtherCustomError } from "../errors/other-error";
interface MemberAddBody {
    community: string;
    user: string;
    role: string;
}

export async function MemberAdd(
    req: TypedRequest<{}, MemberAddBody>,
    res: express.Response,
    next: express.NextFunction
) {
    const { body } = req;

    if (!mongoose.Types.ObjectId.isValid(body.community)) {
        return next(
            new ResourceNotFoundError([{ param: "community", message: "Community not found" }])
        );
    }
    if (!mongoose.Types.ObjectId.isValid(body.user)) {
        return next(new ResourceNotFoundError([{ param: "user", message: "User not found" }]));
    }
    if (!mongoose.Types.ObjectId.isValid(body.role)) {
        return next(new ResourceNotFoundError([{ param: "role", message: "Role not found" }]));
    }

    const community = await Community.findById(body.community);
    if (!community) {
        return next(
            new ResourceNotFoundError([{ param: "community", message: "Community not found" }])
        );
    }
    if (community.owner.toString() !== req.user!.id) {
        console.log(req.user, community);
        return next(new NotAllowedError());
    }

    const user = await User.findById(body.user);
    if (!user) {
        return next(new ResourceNotFoundError([{ param: "user", message: "User not found" }]));
    }

    const role = await Role.findById(body.role);
    if (!role) {
        return next(new ResourceNotFoundError([{ param: "role", message: "Role not found" }]));
    }

    const existingMember = await Member.findOne({
        community: body.community,
        user: body.user,
    });

    if (existingMember) {
        return next(
            new ResourceExistsError([
                { param: "user", message: "User is already added in the community." },
            ])
        );
    }

    const newMember = Member.build({
        community: body.community,
        user: body.user,
        role: body.role,
    });
    await newMember.save();

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
        data: { ...newMember.toJSON() },
    });
}

export async function MemberDelete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ResourceNotFoundError([{ message: "Member not found" }]));
    }

    const membership = await Member.findById(id);
    console.log(membership);
    if (!membership) return next(new ResourceNotFoundError([{ message: "Member not found" }]));
    const myMembership = await Member.findOne({ community: membership.community, user: req.user!.id });
    if (!myMembership) return next(new NotAllowedError());
    const myRole = await Role.findById(myMembership.role)
    if (!myRole) return next(new NotAllowedError());
    if(myRole.name !== "Community Admin" && myRole.name !== "Community Moderator"){
        return next(new NotAllowedError());
    }
    
    await Member.findByIdAndDelete(id)

    return JsonResponse(res, {
        statusCode: 200,
        status: true,
    });
}
