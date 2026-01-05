import express from "express";
import { auth, isAdmin } from "../middlewares/auth";
import UsersController from "../controllers/users";
import { uploadImages } from "../configs/multer.config";
import { validate } from "../middlewares/validation";
import {
  CreateUserPasswordSchema,
  CreateUserSchema,
} from "../validations/user";

const authRouter = express.Router();

authRouter.post("/login", UsersController.login);
authRouter.post(
  "/register",
  auth,
  isAdmin,
  uploadImages.single("avatar"),
  validate(CreateUserSchema),
  UsersController.register
);
authRouter.post(
  "/create-password",
  validate(CreateUserPasswordSchema),
  UsersController.createPassword
);
authRouter.post("/logout", auth, UsersController.logout);
authRouter.get("/check-password/:userId", UsersController.checkPassword);
authRouter.get("/me", auth, UsersController.getMe);

export default authRouter;
