import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { IEnrollment } from "../interfaces/enrollment";

export interface CustomRequest extends Request {
  user?: IUser;
  enrollment?: IEnrollment;
  enrolledCourseIds?: string[] | null;
}

function auth(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.cookies["Authorization"];

  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
      res.status(400).send("Specify a JWT_SECRET_KEY in your env file.");
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = <IUser>decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

function isAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).send("Access denied.");
    return;
  }

  next();
}

function isInstructor(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.user.role !== "instructor") {
    res.status(403).send("Access denied.");
    return;
  }

  next();
}

function isStudent(req: CustomRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(403).send("Access denied.");
    return;
  }

  if (req.user.role !== "student") {
    res.status(403).send("Access denied.");
    return;
  }

  next();
}

export { auth, isAdmin, isInstructor, isStudent };
