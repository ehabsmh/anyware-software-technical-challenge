import { useTranslation } from "react-i18next";
import type { IQuizSubmissionPopulated } from "../interfaces/quiz";
import { Avatar } from "@mui/material";
import { Check, Clear } from "@mui/icons-material";
import { useMemo } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { arSA } from "date-fns/locale/ar-SA";
import useLanguage from "./useLanguage";

const localesMap = {
  en: enUS,
  ar: arSA,
};

function useQuizSubmissionsColumns() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const columns = useMemo(
    () => [
      {
        id: "studentName",
        label: t("quizSubmissions.studentTableHeader"),
        render: (row: IQuizSubmissionPopulated) => (
          <div className="flex gap-3 items-center">
            <Avatar
              sx={{ width: 35, height: 35 }}
              src={row.userId.avatar}
              alt={row.userId.name}
            />
            <p>{row.userId.name}</p>
          </div>
        ),
      },
      {
        id: "submittedAt",
        label: t("quizSubmissions.submittedAtTableHeader"),
        render: (row: IQuizSubmissionPopulated) =>
          format(new Date(row.submittedAt), "PPPppp", {
            locale: localesMap[language],
          }),
      },
      {
        id: "score",
        label: t("quizSubmissions.scoreTableHeader"),
        render: (row: IQuizSubmissionPopulated) =>
          `${row.score}/${row.totalPoints}`,
      },
      {
        id: "isCorrected",
        label: t("quizSubmissions.correctedTableHeader"),
        render: (row: IQuizSubmissionPopulated) =>
          row.isCorrected ? <Check /> : <Clear />,
      },
    ],
    [t]
  );
  return columns;
}

export default useQuizSubmissionsColumns;
