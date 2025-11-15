import { Types } from "mongoose";
import AppError from "../../utils/error";
import { User } from "../../models";

class UserService {
  static async userExists(id: string) {
    if (!id) throw new AppError("User id is required.", 400);
    if (!Types.ObjectId.isValid(id)) throw new AppError("Invalid user id", 400);

    const isExist = await User.exists({ _id: id });

    return !!isExist;
  }
}
export default UserService;
