import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { MemberValidation } from "../validation/member.validation";
import { MemberAdd, MemberDelete } from "../controllers/member.controller";

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
    "/member/:id/:communityId",
    currentUser,
    requireAuth,
    MemberDelete
);

export { MemberRouter };
