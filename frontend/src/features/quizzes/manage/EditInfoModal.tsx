import { Box, Modal } from "@mui/material";
import QuizInfoForm from "../create/QuizInfoForm";
import { FormProvider, useForm } from "react-hook-form";
import type { IInstructorQuiz } from "../../../interfaces/quiz";
import { useUpdateQuizInfo } from "../../../hooks/useQuizzes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function EditInfoModal({
  row,
  onClose,
}: {
  row: IInstructorQuiz["items"][number];
  onClose: () => void;
}) {
  const { mutate: updateQuizInfo } = useUpdateQuizInfo();

  const dueDate = row.dueDate.split("T")[0];

  const methods = useForm({
    defaultValues: {
      semester: row.semester,
      course: row.course._id,
      topic: row.topic,
      dueDate: dueDate,
      timeLimitInMinutes: row.timeLimitInMinutes,
      attemptsAllowed: row.attemptsAllowed,
      totalPoints: row.totalPoints,
    },
  });

  function handleUpdateQuizInfo() {
    const data = methods.getValues();

    updateQuizInfo({ id: row._id, quizData: data });
    onClose();
  }

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <FormProvider {...methods}>
        <Box sx={style} className="flex flex-col gap-4">
          <QuizInfoForm editMode={true} onNext={handleUpdateQuizInfo} />
        </Box>
      </FormProvider>
    </Modal>
  );
}

export default EditInfoModal;
