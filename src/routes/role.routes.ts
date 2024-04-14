import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { CommunityValidation } from "../validation/community.validation";
import { CommunityCreate } from "../controllers/community.controller";
import { RoleValidation } from "../validation/role.validation";
import { RoleCreate, RoleGetAll } from "../controllers/role.controller";

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
