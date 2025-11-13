export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  author: string;
  course: string;
  semester: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAnnouncementPopulated
  extends Omit<IAnnouncement, "author" | "course" | "semester"> {
  author: { _id: string; name: string; avatar: string };
  course: { _id: string; name: string };
  semester: { _id: string; name: string };
}

export interface IAnnouncementResponse {
  items: IAnnouncementPopulated[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
