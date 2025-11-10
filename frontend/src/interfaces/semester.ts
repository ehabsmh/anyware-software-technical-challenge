export interface ISemester {
  _id: string;
  name: string;
  courses: string[];
  isCurrent: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
