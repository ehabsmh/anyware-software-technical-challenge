import { Avatar, MenuItem, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type FormSelectProps<T> = {
  name: string;
  label: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  getOptionAvatar?: (option: T) => string;
};

function FormSelect<T>({
  name,
  label,
  options,
  getOptionLabel,
  getOptionValue,
  getOptionAvatar,
}: FormSelectProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{ required: `${label} is required` }}
      render={({ field }) => (
        <TextField
          select
          label={label}
          fullWidth
          {...field}
          value={field.value || ""}
          error={!!errors[name]?.message}
          helperText={errors[name]?.message as string}
        >
          {options?.map((option) => {
            const value = getOptionValue(option);
            const label = getOptionLabel(option);
            return getOptionAvatar ? (
              <MenuItem key={value} value={value}>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={getOptionAvatar(option)}
                    alt={label}
                    sx={{ borderRadius: 1 }}
                  />
                  <Typography sx={{ textWrap: "wrap" }}>{label}</Typography>
                </div>
              </MenuItem>
            ) : (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            );
          })}
        </TextField>
      )}
    />
  );
}

export default FormSelect;
