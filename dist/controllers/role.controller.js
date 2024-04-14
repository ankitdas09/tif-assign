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
exports.RoleGetAll = exports.RoleCreate = void 0;
const role_model_1 = require("../models/role.model");
const buildResponse_1 = require("../utils/buildResponse");
const resource_exists_error_1 = require("../errors/resource-exists-error");
function RoleCreate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const existingRole = yield role_model_1.Role.findOne({ name: body.name });
        if (existingRole) {
            return next(new resource_exists_error_1.ResourceExistsError([{ param: "name", message: "role already exists!" }]));
        }
        const newRole = role_model_1.Role.build({
            name: body.name,
            scopes: [],
        });
        yield newRole.save();
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: Object.assign({}, newRole.toJSON()),
        });
    });
}
exports.RoleCreate = RoleCreate;
function RoleGetAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        let page = parseInt(req.query.page);
        if (!page)
            page = 1;
        const totalDocs = yield role_model_1.Role.countDocuments();
        const roles = yield role_model_1.Role.find()
            .limit(10)
            .skip((page - 1) * 10)
            .sort({ createdAt: -1 });
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: [roles],
            meta: {
                total: totalDocs,
                pages: Math.ceil(totalDocs / 10),
                page: page,
            },
        });
    });
}
exports.RoleGetAll = RoleGetAll;
