export interface IQuiz {
  _id: string;
  course: string;
  topic: string;
  dueDate: string;
  semester: string;
  timeLimitInMinutes: number;
  attemptsAllowed: number;
  totalPoints: number;
  status: "draft" | "published";
  questions: {
    type: "" | "mcq" | "true_false" | "short_answer";
    question: string;
    options?: string[];
    answer?: number[] | string;
    points: number;
  }[];
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

export interface IInstructorQuiz {
  items: {
    _id: string;
    topic: string;
    course: {
      _id: string;
      name: string;
    };
    semester: string;
    timeLimitInMinutes: number;
    attemptsAllowed: number;
    totalPoints: number;
    dueDate: string;
    status: "draft" | "published";
    numQuestions: number;
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
