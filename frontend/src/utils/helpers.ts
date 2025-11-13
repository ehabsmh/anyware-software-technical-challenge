import { toast } from "sonner";

export function showAlert(action: () => void) {
  toast.error("Are you sure you want to remove this item?", {
    id: "delete-confirm",
    cancel: {
      label: "No",
      onClick: () => {
        toast.dismiss("delete-confirm");
      },
    },
    action: {
      label: "Yes",
      onClick: async () => {
        action();
        toast.dismiss("delete-confirm");
      },
    },
    duration: Infinity,
    richColors: true,
  });
}
