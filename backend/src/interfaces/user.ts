import { Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string | undefined;
  phone: string;
  gender: string;
  role: "student" | "instructor" | "admin";
  avatar?: string | undefined;
  enrolledIn: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, IUserMethods>;

export default UserModel;
