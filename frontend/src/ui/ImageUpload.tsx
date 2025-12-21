import { CloudUpload } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

function ImageUpload({ image }: { image?: string | null }) {
  const { t } = useTranslation();

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file, { shouldDirty: true });
    }
  };

  useEffect(() => {
    setPreview(image || null);
  }, [image]);

  useEffect(() => {
    return () => {
      // Revoke the data uri to avoid memory leaks
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Box className="flex flex-col items-center gap-2">
      <Button
        variant="outlined"
        component="label"
        startIcon={<CloudUpload />}
        sx={{
          borderColor: "var(--color-gradient-1)",
          color: "var(--color-gradient-1)",
          "&:hover": {
            borderColor: "var(--color-gradient-2)",
            color: "var(--color-gradient-2)",
          },
        }}
      >
        {t("createCoursePage.imageUploadLabel")}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </Button>
      {preview && (
        <Avatar
          src={preview}
          alt="Preview"
          sx={{ width: 100, height: 100, borderRadius: "12px" }}
        />
      )}
      {errors.image && (
        <Typography color="error" fontSize={13}>
          {typeof errors.image.message === "string" ? errors.image.message : "Invalid image"}
        </Typography>
      )}
    </Box>
  );
}

export default ImageUpload;
