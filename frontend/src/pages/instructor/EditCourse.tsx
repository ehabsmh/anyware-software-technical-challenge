import { FormProvider, useForm } from "react-hook-form";
import { useCourse, useUpdateCourse } from "../../hooks/useCourses";
import { useParams } from "react-router-dom";
import { applyValidationErrors } from "../../utils/helpers";
import CourseForm from "../../features/courses/CourseForm";
import type { CourseFormValues } from "../../interfaces/course";
import { useEffect } from "react";

function EditCourse() {
  const formDefaultValues: CourseFormValues = {
    name: "",
    description: "",
    semester: "",
    image: null,
  };

  const methods = useForm<CourseFormValues>({
    defaultValues: formDefaultValues,
  });

  const { reset, setError } = methods;

  const { id } = useParams<{ id: string }>();

  const { data: courseData } = useCourse(id!);

  const { mutate: updateCourse, isPending: isEditing } = useUpdateCourse();

  function handleEditCourse(data: CourseFormValues) {
    if (id) {
      updateCourse(
        { id, payload: data },
        {
          onError: (err) =>
            applyValidationErrors<CourseFormValues>(err, setError),
        }
      );
    }
  }

  useEffect(() => {
    if (courseData) {
      reset({
        name: courseData.name,
        description: courseData.description,
        semester: courseData.semester._id,
        image: courseData.image,
      });
    }
  }, [courseData, reset]);

  return (
    <FormProvider {...methods}>
      <CourseForm
        onSubmit={handleEditCourse}
        isSubmitting={isEditing}
        editMode={true}
        courseData={courseData}
      />
    </FormProvider>
  );
}

export default EditCourse;
