import AnnouncementForm from "../../features/announcements/AnnouncementForm";
import type { IAnnouncement } from "../../interfaces/announcement";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateAnnouncement } from "../../hooks/useAnnouncements";
import { applyValidationErrors } from "../../utils/helpers";

function CreateAnnouncement() {
  const { mutate: createAnnouncement, isPending: isCreating } =
    useCreateAnnouncement();

  const methods = useForm<Partial<IAnnouncement>>();
  const { setError } = methods;

  const handleAddAnnouncement = async (data: Partial<IAnnouncement>) => {
    createAnnouncement(data, {
      onError: (error) =>
        applyValidationErrors<Partial<IAnnouncement>>(error, setError),
    });
  };

  return (
    <FormProvider {...methods}>
      <AnnouncementForm
        onSubmit={handleAddAnnouncement}
        isSubmitting={isCreating}
        editMode={false}
      />
    </FormProvider>
  );
}

export default CreateAnnouncement;
