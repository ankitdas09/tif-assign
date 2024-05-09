import { Router } from "express";
import { validateRequest } from "../../universe/v1/middlewares/validate-request";
import { currentUser } from "../../universe/v1/middlewares/current-user";
import { requireAuth } from "../../universe/v1/middlewares/require-auth";
import { CommunityValidation } from "../../universe/v1/validation/community.validation";
import {
    CommunityCreate,
    CommunityGetAll,
    CommunityGetAllMembers,
    CommunityGetJoined,
    CommunityGetOwned,
} from "../../controllers/v1/community.controller";

const CommunityRouter = Router();

CommunityRouter.post(
    "/community",
    CommunityValidation.create,
    validateRequest,
    currentUser,
    requireAuth,
    CommunityCreate
);
CommunityRouter.get("/community", CommunityGetAll);
CommunityRouter.get("/community/:id/members", CommunityGetAllMembers);

CommunityRouter.get("/community/me/owned", currentUser, requireAuth, CommunityGetOwned);
CommunityRouter.get("/community/me/joined", currentUser, requireAuth, CommunityGetJoined);

export { CommunityRouter };
