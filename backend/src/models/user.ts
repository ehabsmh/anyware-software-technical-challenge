import { model, Schema } from "mongoose";
import UserModel, { IUser, IUserMethods } from "../interfaces/user";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: String,
    email: { type: String, lowercase: true },
    password: String,
    phone: String,
    avatar: String,
    gender: String,
    role: { type: String, enum: ["student", "instructor", "admin"] },
  },
  { timestamps: true }
);

userSchema.method("comparePassword", async function (password: string) {
  return await bcrypt.compare(password, this.password!);
});

const User = model<IUser, UserModel>("User", userSchema);
export default User;
