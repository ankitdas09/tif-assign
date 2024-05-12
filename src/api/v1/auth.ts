import { Router } from "express";
import { AuthMe, AuthSignin, AuthSignup } from "../../controllers/v1/auth";
import { AuthValidation } from "../../universe/v1/validation/auth.validation";
import { validateRequest } from "../../universe/v1/middlewares/validate-request";
import { currentUser } from "../../universe/v1/middlewares/current-user";
import { requireAuth } from "../../universe/v1/middlewares/require-auth";

const AuthRouter = Router();

AuthRouter.post("/auth/signup", AuthValidation.signup, validateRequest, AuthSignup);
AuthRouter.post("/auth/signin", AuthValidation.signin, validateRequest, AuthSignin);
AuthRouter.get("/auth/me", currentUser, requireAuth, AuthMe);

export { AuthRouter };
