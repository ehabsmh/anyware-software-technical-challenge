import { OpenInNew } from "@mui/icons-material";
import type { ICourseLesson } from "../../interfaces/courseLesson";
import { useTranslation } from "react-i18next";

export default function CourseResources({
  lesson,
}: {
  lesson?: ICourseLesson;
}) {
  const { t } = useTranslation();
  if (!lesson?.resources?.length) {
    return (
      <p className="text-gray-500 text-sm">
        {t("courseLessons.courseLesson.noResourcesText")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {lesson.resources.map((res, index) => (
        <div
          key={index}
          className="
            bg-white
            rounded-xl
            p-4
            flex
            items-center
            justify-between
            shadow-sm
            hover:shadow-md
            transition
          "
        >
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{res.name}</span>
            <span className="text-xs text-gray-400">External resource</span>
          </div>

          <button
            onClick={() => window.open(res.url, "_blank")}
            className="
              text-blue-600
              hover:text-blue-800
              transition
            "
          >
            <OpenInNew />
          </button>
        </div>
      ))}
    </div>
  );
}
