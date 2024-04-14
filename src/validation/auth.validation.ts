import { body } from "express-validator";

class AuthValidation {
    static signup = [
        body("name")
            .isLength({ min: 2 })
            .withMessage("name should be atleast 2 characters"),
        body("email").isEmail().trim().withMessage("email must be a valid email address"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("name should be atleast 6 characters"),
    ];
    static signin = [
        body("email").isEmail().withMessage("email must be a valid email address"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("name should be atleast 6 characters"),
    ];
}

export { AuthValidation };
