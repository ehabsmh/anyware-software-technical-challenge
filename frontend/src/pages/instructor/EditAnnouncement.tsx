import type { IAnnouncement } from "../../interfaces/announcement";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import {
  useAnnouncement,
  useEditAnnouncement,
} from "../../hooks/useAnnouncements";
import { applyValidationErrors } from "../../utils/helpers";
import AnnouncementForm from "../../features/announcements/AnnouncementForm";

function EditAnnouncement() {
  const { id } = useParams();

  const methods = useForm<Partial<IAnnouncement>>();
  const { reset, setError } = methods;

  const { data: announcement } = useAnnouncement(id || "");

  const { mutate: editAnnouncement, isPending: isEditing } =
    useEditAnnouncement();

  function handleEditAnnouncement(data: Partial<IAnnouncement>) {
    editAnnouncement(
      { id: id!, payload: data },
      {
        onError: (error) =>
          applyValidationErrors<Partial<IAnnouncement>>(error, setError),
      }
    );
  }

  useEffect(() => {
    if (announcement) {
      reset({
        title: announcement.title,
        content: announcement.content,
        semester: announcement.semester._id,
        course: announcement.course._id,
      });
    }
  }, [announcement, reset]);

  return (
    <FormProvider {...methods}>
      <AnnouncementForm
        editMode={true}
        onSubmit={handleEditAnnouncement}
        isSubmitting={isEditing}
      />
    </FormProvider>
  );
}

export default EditAnnouncement;
