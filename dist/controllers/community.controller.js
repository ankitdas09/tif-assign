"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityGetJoined = exports.CommunityGetOwned = exports.CommunityGetAllMembers = exports.CommunityGetAll = exports.CommunityCreate = void 0;
const buildResponse_1 = require("../utils/buildResponse");
const community_model_1 = require("../models/community.model");
const uuid_1 = require("uuid");
const member_model_1 = require("../models/member.model");
const role_model_1 = require("../models/role.model");
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
function CommunityCreate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const newCommunity = community_model_1.Community.build({
            name: body.name,
            slug: `${body.name.toLowerCase()}${(0, uuid_1.v4)()}`,
            owner: req.user.id,
        });
        yield newCommunity.save();
        let role;
        let adminRole = yield role_model_1.Role.findOne({ name: "Community Admin" });
        if (!adminRole) {
            const newRole = role_model_1.Role.build({ name: "Community Admin", scopes: [] });
            yield newRole.save();
            role = newRole;
        }
        else {
            role = adminRole;
        }
        const newMember = member_model_1.Member.build({
            community: newCommunity._id,
            user: req.user.id,
            role: role._id,
        });
        yield newMember.save();
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: Object.assign({}, newCommunity.toJSON()),
        });
    });
}
exports.CommunityCreate = CommunityCreate;
function CommunityGetAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        let page = parseInt(req.query.page);
        if (!page)
            page = 1;
        const totalDocs = yield community_model_1.Community.countDocuments();
        const communities = yield community_model_1.Community.find()
            .limit(10)
            .skip((page - 1) * 10)
            .sort({ createdAt: -1 })
            .populate("owner", "-createdAt -email");
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: communities,
            meta: {
                total: totalDocs,
                pages: Math.ceil(totalDocs / 10),
                page: page,
            },
        });
    });
}
exports.CommunityGetAll = CommunityGetAll;
function CommunityGetAllMembers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        // @ts-ignore
        let page = parseInt(req.query.page);
        if (!page)
            page = 1;
        try {
            const validCommunity = yield community_model_1.Community.findById(id);
            if (!validCommunity)
                return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "community", message: "Community not found." }]));
        }
        catch (error) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "community", message: "Community not found." }]));
        }
        const totalDocs = yield member_model_1.Member.countDocuments({ community: id });
        const members = yield member_model_1.Member.find({ community: id })
            .limit(10)
            .skip((page - 1) * 10)
            .sort({ createdAt: -1 })
            .populate("user", "-email -createdAt")
            .populate("role", "-createdAt -updatedAt");
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: members,
            meta: {
                total: totalDocs,
                pages: Math.ceil(totalDocs / 10),
                page: page,
            },
        });
    });
}
exports.CommunityGetAllMembers = CommunityGetAllMembers;
function CommunityGetOwned(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = parseInt(req.query.page);
        if (!page)
            page = 1;
        const totalDocs = yield community_model_1.Community.countDocuments({ owner: req.user.id });
        const communities = yield community_model_1.Community.find({ owner: req.user.id });
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: communities,
            meta: {
                total: totalDocs,
                pages: Math.ceil(totalDocs / 10),
                page: page,
            },
        });
    });
}
exports.CommunityGetOwned = CommunityGetOwned;
function CommunityGetJoined(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let page = parseInt(req.query.page);
        if (!page)
            page = 1;
        const members = yield member_model_1.Member.find({ user: req.user.id });
        const communityIds = members.map((m) => m.community);
        const communities = yield community_model_1.Community.find({ _id: communityIds })
            .limit(10)
            .skip((page - 1) * 10)
            .populate("owner", "-email -createdAt");
        const totalDocs = yield community_model_1.Community.countDocuments({ _id: communityIds });
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: communities,
            meta: {
                total: totalDocs,
                pages: Math.ceil(totalDocs / 10),
                page: page,
            },
        });
    });
}
exports.CommunityGetJoined = CommunityGetJoined;
