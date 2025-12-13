export interface ILessonResource {
  name: string;
  url: string;
}

export interface ICourseLesson {
  _id: string;
  course: string;
  title: string;
  content: string;
  video: string;
  resources: ILessonResource[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourseLessonPopulated {
  lessons: ICourseLesson[];
  courseDetails: {
    _id: string;
    name: string;
    description: string;
    instructor: {
      _id: string;
      name: string;
      avatar: string;
    };
    semester: {
      _id: string;
      name: string;
      startDate: string;
      endDate: string;
    };
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface ICreateCourseLessonPayload {
  course: string;
  title: string;
  content: string;
  video: FileList | File;
  resources?: ILessonResource[];
  order?: number;
}

export interface IUpdateCourseLessonPayload {
  _id: string;
  title: string;
  content: string;
  resources?: ILessonResource[];
  video?: "";
}
