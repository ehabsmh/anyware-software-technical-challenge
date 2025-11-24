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

function QuestionAccordion({
  qIndex,
  deleteMode,
  deleteQuestion,
}: {
  qIndex: number;
  deleteMode: boolean;
  deleteQuestion: () => void;
}) {
  const {
    register,
    // trigger,
    watch,
    control,
    resetField,
    // formState: { errors },
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
        <Typography component="span">Question {qIndex + 1}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Question text"
          multiline
          rows={4}
          sx={{ mt: 2 }}
          fullWidth
          {...register(`questions.${qIndex}.question`, {
            required: "Question text is required",
          })}
          // error={!!errors.questions?.[0]?.question}
        />

        <Controller
          name={`questions.${qIndex}.type`}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              select
              label="Question type"
              sx={{ mt: 4 }}
              fullWidth
              defaultValue=""
              {...field}
              onChange={(e) => {
                field.onChange(e.target.value);
                resetField(`questions.${qIndex}.options`);
                resetField(`questions.${qIndex}.answer`);
              }}
              error={!!watch(`questions.${qIndex}.type`) === false}
            >
              <MenuItem value="mcq">Multiple Choice Question</MenuItem>
              <MenuItem value="true_false">True / False Question</MenuItem>
              <MenuItem value="short_answer">Short Answer Question</MenuItem>
            </TextField>
          )}
        />

        {questionTypeOptions[questionType]}

        <TextField
          size="small"
          label="Points"
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
