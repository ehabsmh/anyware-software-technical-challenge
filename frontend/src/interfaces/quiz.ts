export interface IQuiz {
  _id: string;
  course: string;
  topic: string;
  dueDate: Date;
  questions: {
    _id: string;
    question: string;
    options: string[];
    answer?: number;
  }[];
  semester: string;
}

export interface IQuizUpcoming {
  _id: string;
  topic: string;
  dueDate: Date;
  questions: {
    _id: string;
    question: string;
    options: string[];
    answer?: number;
  }[];
  course: {
    _id: string;
    name: string;
    instructor: string;
  };
  semester: {
    _id: string;
    name: string;
    startDate: Date;
    endDate: Date;
  };
}

export interface IQuizSubmission {
  score: number;
  total: number;

  details: {
    question: IQuiz["questions"][number]["question"];
    correctAnswer: IQuiz["questions"][number]["answer"];
    correct: boolean;
    userAnswer: number | null;
  }[];
}
