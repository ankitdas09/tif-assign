import { Router } from "express";
import { validateRequest } from "../../universe/v1/middlewares/validate-request";
import { currentUser } from "../../universe/v1/middlewares/current-user";
import { requireAuth } from "../../universe/v1/middlewares/require-auth";
import { MemberValidation } from "../../universe/v1/validation/member.validation";
import { MemberAdd, MemberDelete } from "../../controllers/v1/member.controller";

const MemberRouter = Router();

MemberRouter.post(
    "/member",
    MemberValidation.add,
    validateRequest,
    currentUser,
    requireAuth,
    MemberAdd
);
MemberRouter.delete(
    "/member/:id",
    currentUser,
    requireAuth,
    MemberDelete
);

export { MemberRouter };
