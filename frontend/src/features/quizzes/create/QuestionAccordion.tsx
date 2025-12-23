/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDropDown, Delete } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import McqOptions from "./McqOptions";
import TrueFalseOptions from "./TrueFalseOptions";
import { useTranslation } from "react-i18next";

function QuestionAccordion({
  qIndex,
  deleteMode,
  deleteQuestion,
}: {
  qIndex: number;
  deleteMode: boolean;
  deleteQuestion: () => void;
}) {
  const { t } = useTranslation();

  const {
    register,
    watch,
    control,
    resetField,
    formState: { errors },
  } = useFormContext();

  const questionTypeOptions = {
    mcq: <McqOptions qIndex={qIndex} />,
    true_false: <TrueFalseOptions qIndex={qIndex} />,
    short_answer: <></>,
  };

  const questionType: keyof typeof questionTypeOptions = watch(
    `questions.${qIndex}.type`
  );

  return (
    <Accordion sx={{ mt: 2, flex: 1 }}>
      <AccordionSummary
        expandIcon={<ArrowDropDown />}
        aria-controls={`panel${qIndex}-content`}
        id={`panel${qIndex}-header`}
      >
        {deleteMode && (
          <>
            <Delete
              onClick={deleteQuestion}
              sx={{
                color: "#e94343ff",
                transition: "color 0.2s",
                "&:hover": { color: "#a40606" },
              }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          </>
        )}
        <Typography component="span">
          {t("createQuizQuestions.question.questionTitle")} {qIndex + 1}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label={t("createQuizQuestions.question.questionTextInputLabel")}
          multiline
          rows={4}
          sx={{ mt: 2 }}
          fullWidth
          {...register(`questions.${qIndex}.question`, {
            required: "Question text is required",
          })}
          error={!!(errors.questions as any)?.[qIndex]?.question}
        />

        <Controller
          name={`questions.${qIndex}.type`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              label={t("createQuizQuestions.question.questionTypeSelectLabel")}
              sx={{ mt: 4 }}
              fullWidth
              defaultValue=""
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
                resetField(`questions.${qIndex}.options`);
                resetField(`questions.${qIndex}.answer`);
              }}
              // error={!!watch(`questions.${qIndex}.type`)}
            >
              <MenuItem value="mcq">
                {t("createQuizQuestions.question.multipleChoice")}
              </MenuItem>
              <MenuItem value="true_false">
                {t("createQuizQuestions.question.trueFalse")}
              </MenuItem>
              <MenuItem value="short_answer">
                {t("createQuizQuestions.question.shortAnswer")}
              </MenuItem>
            </TextField>
          )}
        />

        {questionTypeOptions[questionType]}

        <TextField
          size="small"
          label={t("createQuizQuestions.question.pointInputLabel")}
          type="number"
          sx={{ mt: 4, width: "150px" }}
          fullWidth
          {...register(`questions.${qIndex}.points`, {
            required: "Points are required",
            valueAsNumber: true,
          })}
          // error={!!errors.questions?.[0]?.points}
        />
      </AccordionDetails>
    </Accordion>
  );
}

export default QuestionAccordion;
