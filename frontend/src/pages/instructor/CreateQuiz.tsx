import CreateQuizStepper from "../../features/quizzes/create/CreateQuizStepper";

export default function CreateQuiz() {
  return (
    <div className="overflow-y-auto p-8 h-[calc(100vh-86px)] bg-main">
      <CreateQuizStepper />
    </div>
  );
}
