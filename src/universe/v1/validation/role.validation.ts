import { body } from "express-validator";

class RoleValidation {
    static create = [
        body("name")
            .isLength({ min: 2 })
            .withMessage("name should be atleast 2 characters"),
    ];
}

export { RoleValidation };
