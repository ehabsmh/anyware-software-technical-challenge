export interface IQuiz {
  _id: string;
  course: string;
  semester: string;
  createdBy: string;
  topic: string;
  dueDate: string;
  status: "draft" | "published";
  timeLimitInMinutes: number;
  totalPoints: number;
  questions: {
    _id: string;
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
  questions: IQuiz["questions"];
  course: {
    _id: string;
    name: string;
    instructor: string;
  };
  semester?: {
    _id: string;
    name: string;
    startDate: Date;
    endDate: Date;
  };
}

export interface ISubmitQuiz {
  quizId: string;
  userId: string;
  answers: {
    questionId: string;
    answer: number[] | string;
    instructorNote?: string;
    points?: number;
  }[];
}

export interface ICorrectQuiz {
  submissionId: string;
  answers: {
    questionId: string;
    instructorNote?: string;
    points: number;
    questionScore: number;
  }[];
}

export interface IQuizSubmission {
  _id: string;
  quizId: string;
  userId: string;

  questions?: IQuiz["questions"];
  answers: {
    _id: string;
    questionId: string;
    answer: number[] | string;
    isCorrect: "true" | "false" | "partially";
    points: number;
    instructorNote?: string;
  }[];
  score: number;
  totalPoints: number;
  isCorrected: boolean;
  submittedAt: string;
  correctedAt?: string;
}

export interface IQuizSubmissionPopulated
  extends Omit<IQuizSubmission, "quizId" | "userId"> {
  quizId: {
    _id: string;
    topic: string;
    course: {
      _id: string;
      name: string;
    };
  };

  userId: {
    _id: string;
    name: string;
    avatar: string;
  };
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
