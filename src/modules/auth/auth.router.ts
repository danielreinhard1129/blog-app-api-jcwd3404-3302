import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { RegisterDTO } from "./dto/register.dto";
import { LoginDTO } from "./dto/login.dto";
import { ForgotPasswordDTO } from "./dto/forgot-password.dto";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
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
  };

  getRouter = () => {
    return this.router;
  };
}
