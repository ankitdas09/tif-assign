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
exports.currentUser = void 0;
const token_1 = require("../utils/token");
function currentUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            return next();
        }
        try {
            const decoded = token_1.Token.verifyJWT(req.headers.authorization.split(" ")[1]);
            req.user = decoded;
            // req.currentUser = { id: resp.data._id, email: resp.data.outlookEmail };
        }
        catch (error) {
            // console.log("error from current-user middleware", error);
            return next();
        }
        return next();
    });
}
exports.currentUser = currentUser;
