export interface IUser {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  role: "student" | "admin" | "instructor";
  avatar: string;
}
