"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberValidation = void 0;
const express_validator_1 = require("express-validator");
class MemberValidation {
}
exports.MemberValidation = MemberValidation;
MemberValidation.add = [
    (0, express_validator_1.body)("community")
        .notEmpty(),
    (0, express_validator_1.body)("user")
        .notEmpty(),
    (0, express_validator_1.body)("role")
        .notEmpty(),
];
