"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("../");
class Token {
    static signJWT(userId, userEmail) {
        const signed = jsonwebtoken_1.default.sign({ id: userId, email: userEmail }, __1.config.jwtSecret);
        return signed;
    }
    static verifyJWT(token) {
        const verify = jsonwebtoken_1.default.verify(token, __1.config.jwtSecret);
        // @ts-expect-error
        return verify;
    }
}
exports.Token = Token;
