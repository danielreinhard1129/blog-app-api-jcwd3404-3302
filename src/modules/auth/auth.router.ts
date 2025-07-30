import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { ForgotPasswordDTO } from "./dto/forgot-password.dto";
import { ResetPasswordDTO } from "./dto/reset-password.dto";
import { JwtMiddleware } from "../../middlewares/jwt.middleware";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  private jwtMiddleware: JwtMiddleware;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.jwtMiddleware = new JwtMiddleware();
    this.initializedRoutes();
  }

  private initializedRoutes = () => {
    this.router.post(
      "/register", // 1
      validateBody(RegisterDTO), // 2
      this.authController.register // 3
    );
    this.router.post(
      "/login", // 1
      validateBody(LoginDTO), // 2
      this.authController.login // 3
    );
    this.router.post(
      "/forgot-password",
      validateBody(ForgotPasswordDTO),
      this.authController.forgotPassword
    );
    this.router.patch(
      "/reset-password",
      this.jwtMiddleware.verifyToken(process.env.JWT_SECRET_RESET!),
      validateBody(ResetPasswordDTO),
      this.authController.resetPassword
    );
  };

  getRouter = () => {
    return this.router;
  };
}
