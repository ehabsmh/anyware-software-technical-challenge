import { Checkbox, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function McqOptions({ qIndex }: { qIndex: number }) {
  const { register, control } = useFormContext();

  return (
    <div className="space-y-5 mt-5">
      <div className="flex gap-2">
        <Controller
          name={`questions.${qIndex}.answer.0`}
          defaultValue={false}
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <TextField
          label="Option 1"
          fullWidth
          {...register(`questions.${qIndex}.options.0`, {
            required: "Option 1 is required",
          })}
        />
      </div>

      <div className="flex gap-2">
        <Controller
          name={`questions.${qIndex}.answer.1`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <TextField
          label="Option 2"
          fullWidth
          {...register(`questions.${qIndex}.options.1`, {
            required: "Option 2 is required",
          })}
        />
      </div>

      <div className="flex gap-2">
        <Controller
          name={`questions.${qIndex}.answer.2`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <TextField
          label="Option 3"
          fullWidth
          {...register(`questions.${qIndex}.options.2`, {
            required: "Option 3 is required",
          })}
        />
      </div>

      <div className="flex gap-2">
        <Controller
          name={`questions.${qIndex}.answer.3`}
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
        <TextField
          label="Option 4"
          fullWidth
          {...register(`questions.${qIndex}.options.3`, {
            required: "Option 4 is required",
          })}
        />
      </div>
    </div>
  );
}

export default McqOptions;
