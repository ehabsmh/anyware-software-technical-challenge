import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import EditInfoModal from "./EditInfoModal";
import type { IInstructorQuiz } from "../../../interfaces/quiz";
import { useNavigate } from "react-router-dom";
import { useUpdateQuizInfo } from "../../../hooks/useQuizzes";
import { useTranslation } from "react-i18next";

export default function EditMenu({
  row,
}: {
  row: IInstructorQuiz["items"][number];
}) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const { mutate: editQuiz } = useUpdateQuizInfo();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        size="small"
        sx={{ background: "linear-gradient(90deg, #12557b, #408391)" }}
      >
        {t("manageQuizzes.editButtonText")}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setShowEditModal(true);
          }}
        >
          {t("manageQuizzes.editQuizInfoButtonText")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/instructor/quizzes/edit-questions/${row._id}`);
          }}
        >
          {t("manageQuizzes.editQuestionsButtonText")}
        </MenuItem>

        {row.status === "draft" ? (
          <MenuItem
            onClick={() => {
              handleClose();
              editQuiz({ id: row._id, quizData: { status: "published" } });
            }}
          >
            {t("manageQuizzes.setToPublishButtonText")}
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleClose();
              editQuiz({ id: row._id, quizData: { status: "draft" } });
            }}
          >
            {t("manageQuizzes.setToDraftButtonText")}
          </MenuItem>
        )}
      </Menu>

      {showEditModal && (
        <EditInfoModal row={row} onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
}
