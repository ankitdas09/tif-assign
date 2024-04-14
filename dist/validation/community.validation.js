"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityValidation = void 0;
const express_validator_1 = require("express-validator");
class CommunityValidation {
}
exports.CommunityValidation = CommunityValidation;
CommunityValidation.create = [
    (0, express_validator_1.body)("name")
        .isLength({ min: 2 })
        .withMessage("name should be atleast 2 characters"),
];
