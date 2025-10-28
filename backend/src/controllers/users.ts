import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import AppError from "../utils/error";
import { sendEmail } from "../utils/email";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomRequest } from "../middlewares/auth";
import { uploadStream } from "../configs/cloudinary.config";
import { JWT_SECRET_KEY } from "..";

class UsersController {
  static async register(req: CustomRequest, res: Response, next: NextFunction) {
    const { name, phone, gender, email, role, password } = req.body;
    const avatar = req.file;

    const currentUserRole = req.user?.role;

    try {
      // only admins can signup users.
      if (currentUserRole !== "admin")
        throw new AppError("Only Admins can sign up users.", 401);

      // check email duplication
      const emailIsFound = await User.findOne({ email });
      if (emailIsFound) throw new AppError("Email already exists.", 409);

      // check phoneNumber duplication
      const userPhoneIsFound = await User.findOne({ phone });
      if (userPhoneIsFound)
        throw new AppError("phone number already registered.", 409);

      // Check if the user provides a password while signing up.
      if (currentUserRole !== "admin" && password) {
        throw new AppError("Only admins can create users with passwords.", 400);
      }

      const avatarUrl = await uploadStream(avatar, "avatar");

      // create user
      const newUser = await User.create({
        name,
        phone,
        email,
        avatar: avatarUrl,
        gender,
        role,
        password:
          password && role === "admin"
            ? await bcrypt.hash(password, 10)
            : undefined,
      });

      // send email to the user with a link to create a password.
      await sendEmail(newUser);

      res.status(201).json({ newUser, message: "User created successfully." });
    } catch (err) {
      next(err);
    }
  }

  static async createPassword(req: Request, res: Response, next: NextFunction) {
    // End user receives the `id` param after clicking on the button in the email sent to him/her.
    const { userId, password } = req.body;

    try {
      const user = await User.findById(userId);

      if (!user) throw new AppError("user does not exist", 404);

      if (user.password) {
        throw new AppError("User already has a password.", 409);
      }

      const hashedPw = await bcrypt.hash(password, 10);

      user.password = hashedPw;

      if (!JWT_SECRET_KEY) {
        throw new AppError("Specify a JWT_SECRET_KEY in your env file.", 404);
      }

      await user.save();

      const userToken = jwt.sign(
        {
          _id: user._id,
          role: user.role,
          email: user.email,
          fullName: user.name,
          phone: user.phone,
          avatar: user.avatar,
          enrolledIn: user.enrolledIn,
        },
        JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.cookie("Authorization", userToken, {
        httpOnly: true, // Prevent JavaScript access (XSS protection)
        sameSite: "strict", // Prevent CSRF attacks
        secure: process.env.ON_PRODUCTION === "true", // Use secure cookies in production
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration time (e.g., 7 days)
      });

      user.password = undefined; // Remove password from the user object

      res.json({ message: "Password created successfully.", user });
    } catch (err) {
      next(err);
    }
  }

  static async checkPassword(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);

      if (!user) throw new AppError("user does not exist", 404);

      if (user.password) {
        throw new AppError("Password already set.", 409);
      }

      res.json({ message: "Password is not set yet." });
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;
    try {
      // fields required
      if (!email) throw new AppError("Email is required", 400);
      if (!password) throw new AppError("Password is required", 400);

      // find user
      const user = await User.findOne({ email });
      if (!user) throw new AppError("Email is incorrect", 404);

      // if password is undefined, user should create a password.
      if (!user.password) {
        throw new AppError("Password is not set yet. Check your email.", 400);
      }

      // Compare password with the hashed one
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new AppError("Password is incorrect", 400);
      }

      if (!JWT_SECRET_KEY) {
        throw new AppError("Specify a JWT_SECRET_KEY in your env file.", 404);
      }

      // const userObj = user.toObject();
      const userInfo = {
        _id: user._id,
        role: user.role,
        avatar: user.avatar,
        name: user.name,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        enrolledIn: user.enrolledIn,
      };

      const userToken = jwt.sign(userInfo, JWT_SECRET_KEY);

      res.cookie("Authorization", userToken, {
        httpOnly: true, // Prevent JavaScript access (XSS protection)
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set expiration time (e.g., 7 days)
      });
      res.json({ user: userInfo });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req: CustomRequest, res: Response): Promise<void> {
    try {
      const user = req.user;

      if (!req.cookies.Authorization) {
        res.status(400).json({ message: "User is not logged in." });
        return;
      }
      res.clearCookie("Authorization", {
        path: "/",
        secure: process.env.ON_PRODUCTION === "true",
      });
      res.status(200).json({ message: "User logged out successfully." });
    } catch (err) {
      res.status(500).json({ error: "Something went wrong with the server." });
    }
  }

  static async getMe(req: CustomRequest, res: Response, next: NextFunction) {
    res.json({ user: req.user });
  }
}

export default UsersController;
