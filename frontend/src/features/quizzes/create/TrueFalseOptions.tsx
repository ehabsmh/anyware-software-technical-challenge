import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function TrueFalseOptions({ qIndex }: { qIndex: number }) {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <div className="flex gap-2">
      <Controller
        name={`questions.${qIndex}.answer`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel
              value="true"
              control={<Radio />}
              label={t("createQuizQuestions.question.trueCheckboxLabel")}
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label={t("createQuizQuestions.question.falseCheckboxLabel")}
            />
          </RadioGroup>
        )}
      />
    </div>
  );
}

export default TrueFalseOptions;
