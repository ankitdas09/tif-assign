import { Router } from "express";
import { validateRequest } from "../../universe/v1/middlewares/validate-request";
import { currentUser } from "../../universe/v1/middlewares/current-user";
import { requireAuth } from "../../universe/v1/middlewares/require-auth";
import { CommunityValidation } from "../../universe/v1/validation/community.validation";
import { CommunityCreate } from "../../controllers/v1/community.controller";
import { RoleValidation } from "../../universe/v1/validation/role.validation";
import { RoleCreate, RoleGetAll } from "../../controllers/v1/role.controller";

const RoleRouter = Router();

RoleRouter.post(
    "/role",
    RoleValidation.create,
    validateRequest,
    currentUser,
    requireAuth,
    RoleCreate
);

RoleRouter.get(
    "/role",
    RoleGetAll
);

export { RoleRouter };
