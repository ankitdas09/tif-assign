import { body } from "express-validator";

class MemberValidation {
    static add = [
        body("community")
            .notEmpty(),
        body("user")
            .notEmpty(),
        body("role")
            .notEmpty(),
    ];
}

export { MemberValidation };
