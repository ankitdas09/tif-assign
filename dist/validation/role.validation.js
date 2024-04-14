"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleValidation = void 0;
const express_validator_1 = require("express-validator");
class RoleValidation {
}
exports.RoleValidation = RoleValidation;
RoleValidation.create = [
    (0, express_validator_1.body)("name")
        .isLength({ min: 2 })
        .withMessage("name should be atleast 2 characters"),
];
