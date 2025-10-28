export interface IUser {
  _id: string;
  name: string;
  email: string;
  gender: string;
  phone: string;
  role: "user" | "admin" | "instructor";
  avatar: string;
  enrolledIn: string[];
}
