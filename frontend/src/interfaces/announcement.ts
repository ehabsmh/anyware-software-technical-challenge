export interface IAnnouncement {
  _id: string;
  title: string;
  author: string;
  content: string;
  course: { _id: string; name: string; instructor: string };
  createdAt: string;
  updatedAt: string;
}
