export interface ICourse {
  _id: string;
  name: string;
  description: string;
  instructor: string;
  semester: string;
  image: string;
}

// .populate("instructor", "_id name avatar"),

// { items, total, page, limit, totalPages: Math.ceil(total / limit) };
export interface ICourseResponse {
  status: string;
  data: {
    items: ICourse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ICoursePopulated
  extends Omit<ICourse, "semester" | "instructor"> {
  semester: { _id: string; name: string; endDate: string; startDate: string };
  instructor: { _id: string; name: string; avatar: string };
}

export interface CourseFormValues {
  name: string;
  description: string;
  semester: string;
  image: File | string | null;
}
