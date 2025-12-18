import { FormProvider, useForm } from "react-hook-form";
import CourseForm from "../../features/courses/CourseForm";
import { useCreateCourse } from "../../hooks/useCourses";
import { applyValidationErrors } from "../../utils/helpers";
import type { CourseFormValues } from "../../interfaces/course";

function CreateCourse() {
  const formDefaultValues: CourseFormValues = {
    name: "",
    description: "",
    semester: "",
    image: null,
  };

  const methods = useForm<CourseFormValues>({
    defaultValues: formDefaultValues,
  });

  const { setError } = methods;

  const { mutate: addCourse, isPending: isCreating } = useCreateCourse();

  function handleAddCourse(data: CourseFormValues) {
    addCourse(data, {
      onError: (err) => applyValidationErrors<CourseFormValues>(err, setError),
    });
  }

  return (
    <FormProvider {...methods}>
      <CourseForm
        onSubmit={handleAddCourse}
        isSubmitting={isCreating}
        editMode={false}
      />
    </FormProvider>
  );
}

export default CreateCourse;
