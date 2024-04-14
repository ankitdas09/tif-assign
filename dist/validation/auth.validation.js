"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const express_validator_1 = require("express-validator");
class AuthValidation {
}
exports.AuthValidation = AuthValidation;
AuthValidation.signup = [
    (0, express_validator_1.body)("name")
        .isLength({ min: 2 })
        .withMessage("name should be atleast 2 characters"),
    (0, express_validator_1.body)("email").isEmail().trim().withMessage("email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("name should be atleast 6 characters"),
];
AuthValidation.signin = [
    (0, express_validator_1.body)("email").isEmail().withMessage("email must be a valid email address"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("name should be atleast 6 characters"),
];
