import type { ICourse } from "./course";

export interface IEnrollment {
  _id: string;
  courseId: {
    _id: ICourse["_id"];
    name: ICourse["name"];
    description: ICourse["description"];
    image: ICourse["image"];
  };
  semesterId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEnrollmentResponse {
  status: string;
  data: {
    items: IEnrollment[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
