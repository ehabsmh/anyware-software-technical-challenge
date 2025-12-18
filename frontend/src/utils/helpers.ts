import { t } from "i18next";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import type { IValidationError } from "../interfaces/validationError";

export function showAlert(action: () => void) {
  toast.error(t("instructorCoursesPage.deleteConfirmationMessage"), {
    id: "delete-confirm",
    cancel: {
      label: t("instructorCoursesPage.noActionButtonText"),
      onClick: () => {
        toast.dismiss("delete-confirm");
      },
    },
    action: {
      label: t("instructorCoursesPage.yesActionButtonText"),
      onClick: async () => {
        action();
        toast.dismiss("delete-confirm");
      },
    },
    duration: Infinity,
    richColors: true,
  });
}

export function applyValidationErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  if (!error || (error as IValidationError).errors === undefined) return;

  const validationError = error as IValidationError;

  validationError.errors.forEach((err) =>
    setError(err.field as Path<T>, {
      message: err.message,
    })
  );
}

const COLLAPSE_WORDS_LIMIT = 15;

export function isStringCollapsable(str: string): boolean {
  const words = str.trim().split(" ");

  return words.length > COLLAPSE_WORDS_LIMIT;
}

export function collapseString(str: string): string {
  if (!isStringCollapsable(str)) return str;

  return str.split(" ").slice(0, COLLAPSE_WORDS_LIMIT).join(" ") + "...";
}

// export function applyDirection(lang: string) {
//   const isRTL = lang === "ar";

//   document.documentElement.lang = lang;
//   document.documentElement.dir = isRTL ? "rtl" : "ltr";
// }
