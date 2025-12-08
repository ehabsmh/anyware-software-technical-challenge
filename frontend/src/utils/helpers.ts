import { t } from "i18next";
import { toast } from "sonner";

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
