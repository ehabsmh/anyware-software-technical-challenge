import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function TrueFalseOptions({ qIndex }: { qIndex: number }) {
  const { control } = useFormContext();

  // useEffect(() => {
  //   if (getValues(`questions.${qIndex}.options`)) {
  //     unregister(`questions.${qIndex}.options`);
  //   }
  // }, [getValues, qIndex, unregister]);

  return (
    <div className="flex gap-2">
      <Controller
        name={`questions.${qIndex}.answer`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup {...field}>
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        )}
      />
    </div>
  );
}

export default TrueFalseOptions;
