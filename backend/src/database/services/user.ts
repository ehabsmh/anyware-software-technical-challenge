import { Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import AppError from "../../utils/error";
import { User } from "../../models";
import { IUser } from "../../interfaces/user";
import { JWT_SECRET_KEY } from "../..";
class UserService {
  static async userExists(id: string) {
    if (!id) throw new AppError("User id is required.", 400);
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid user id", 400);

    const isExist = await User.exists({ _id: id });

    return !!isExist;
  }

  static async loginUser(user: IUser, res: Response) {
    if (!JWT_SECRET_KEY) {
      throw new AppError("JWT_SECRET_KEY missing", 500);
    }

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

    const token = jwt.sign(userInfo, JWT_SECRET_KEY);

    res.cookie("Authorization", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return userInfo;
  }
}
export default UserService;
