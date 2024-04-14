import { Router } from "express";
import { AuthMe, AuthSignin, AuthSignup } from "../controllers/auth.controller";
import { AuthValidation } from "../validation/auth.validation";
import { validateRequest } from "../middlewares/validate-request";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const AuthRouter = Router();

AuthRouter.post("/auth/signup", AuthValidation.signup, validateRequest, AuthSignup);
AuthRouter.post("/auth/signin", AuthValidation.signin, validateRequest, AuthSignin);
AuthRouter.get("/auth/me", currentUser, requireAuth, AuthMe);

export { AuthRouter };
