"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_signed_in_error_1 = require("../errors/not-signed-in-error");
function requireAuth(req, res, next) {
    if (!req.user) {
        throw new not_signed_in_error_1.NotSignedInError();
    }
    next();
}
exports.requireAuth = requireAuth;
