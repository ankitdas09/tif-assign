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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberDelete = exports.MemberAdd = void 0;
const role_model_1 = require("../models/role.model");
const buildResponse_1 = require("../utils/buildResponse");
const resource_exists_error_1 = require("../errors/resource-exists-error");
const mongoose_1 = __importDefault(require("mongoose"));
const resource_not_found_error_1 = require("../errors/resource-not-found-error");
const community_model_1 = require("../models/community.model");
const user_model_1 = require("../models/user.model");
const not_allowed_error_1 = require("../errors/not-allowed-error");
const member_model_1 = require("../models/member.model");
function MemberAdd(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        if (!mongoose_1.default.Types.ObjectId.isValid(body.community)) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "community", message: "Community not found" }]));
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(body.user)) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "user", message: "User not found" }]));
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(body.role)) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "role", message: "Role not found" }]));
        }
        const community = yield community_model_1.Community.findById(body.community);
        if (!community) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "community", message: "Community not found" }]));
        }
        if (community.owner.toString() !== req.user.id) {
            console.log(req.user, community);
            return next(new not_allowed_error_1.NotAllowedError());
        }
        const user = yield user_model_1.User.findById(body.user);
        if (!user) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "user", message: "User not found" }]));
        }
        const role = yield role_model_1.Role.findById(body.role);
        if (!role) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ param: "role", message: "Role not found" }]));
        }
        const existingMember = yield member_model_1.Member.findOne({
            community: body.community,
            user: body.user,
        });
        if (existingMember) {
            return next(new resource_exists_error_1.ResourceExistsError([
                { param: "user", message: "User is already added in the community." },
            ]));
        }
        const newMember = member_model_1.Member.build({
            community: body.community,
            user: body.user,
            role: body.role,
        });
        yield newMember.save();
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: Object.assign({}, newMember.toJSON()),
        });
    });
}
exports.MemberAdd = MemberAdd;
function MemberDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ message: "Member not found" }]));
        }
        const membership = yield member_model_1.Member.findById(id);
        console.log(membership);
        if (!membership)
            return next(new resource_not_found_error_1.ResourceNotFoundError([{ message: "Member not found" }]));
        const myMembership = yield member_model_1.Member.findOne({ community: membership.community, user: req.user.id });
        if (!myMembership)
            return next(new not_allowed_error_1.NotAllowedError());
        const myRole = yield role_model_1.Role.findById(myMembership.role);
        if (!myRole)
            return next(new not_allowed_error_1.NotAllowedError());
        if (myRole.name !== "Community Admin" && myRole.name !== "Community Moderator") {
            return next(new not_allowed_error_1.NotAllowedError());
        }
        yield member_model_1.Member.findByIdAndDelete(id);
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
        });
    });
}
exports.MemberDelete = MemberDelete;
