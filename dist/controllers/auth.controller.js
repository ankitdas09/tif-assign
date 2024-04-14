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
exports.AuthMe = exports.AuthSignin = exports.AuthSignup = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const resource_exists_error_1 = require("../errors/resource-exists-error");
const buildResponse_1 = require("../utils/buildResponse");
const token_1 = require("../utils/token");
const invalid_credentials_error_1 = require("../errors/invalid-credentials-error");
function AuthSignup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const existingUser = yield user_model_1.User.findOne({ email: body.email });
        if (existingUser) {
            return next(new resource_exists_error_1.ResourceExistsError([
                { param: "email", message: "User with this email address already exists." },
            ]));
        }
        const hashed = bcrypt_1.default.hashSync(body.password, 10);
        const newUser = user_model_1.User.build({ name: body.name, email: body.email, password: hashed });
        yield newUser.save();
        const access_token = token_1.Token.signJWT(newUser._id, newUser.email);
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 201,
            status: true,
            data: Object.assign({}, newUser.toJSON()),
            meta: { access_token },
        });
    });
}
exports.AuthSignup = AuthSignup;
function AuthSignin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = req;
        const existingUser = yield user_model_1.User.findOne({ email: body.email });
        if (!existingUser) {
            return next(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        const isPassCorrect = bcrypt_1.default.compareSync(body.password, existingUser.password);
        if (!isPassCorrect) {
            return next(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        const access_token = token_1.Token.signJWT(existingUser._id, existingUser.email);
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: Object.assign({}, existingUser.toJSON()),
            meta: { access_token },
        });
    });
}
exports.AuthSignin = AuthSignin;
function AuthMe(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield user_model_1.User.findOne({ email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email });
        return (0, buildResponse_1.JsonResponse)(res, {
            statusCode: 200,
            status: true,
            data: Object.assign({}, existingUser === null || existingUser === void 0 ? void 0 : existingUser.toJSON()),
        });
    });
}
exports.AuthMe = AuthMe;
