import { Router } from "express";
import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { CommunityValidation } from "../validation/community.validation";
import {
    CommunityCreate,
    CommunityGetAll,
    CommunityGetAllMembers,
    CommunityGetJoined,
    CommunityGetOwned,
} from "../controllers/community.controller";

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
