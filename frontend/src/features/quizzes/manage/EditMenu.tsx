import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import EditInfoModal from "./EditInfoModal";
import type { IInstructorQuiz } from "../../../interfaces/quiz";
import { useNavigate } from "react-router-dom";
import { useUpdateQuizInfo } from "../../../hooks/useQuizzes";

export default function EditMenu({
  row,
}: {
  row: IInstructorQuiz["items"][number];
}) {
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
        Edit
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
          Edit Info
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            navigate(`/instructor/quizzes/edit-questions/${row._id}`);
          }}
        >
          Edit Questions
        </MenuItem>

        {row.status === "draft" ? (
          <MenuItem
            onClick={() => {
              handleClose();
              editQuiz({ id: row._id, quizData: { status: "published" } });
            }}
          >
            Set to publish
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleClose();
              editQuiz({ id: row._id, quizData: { status: "draft" } });
            }}
          >
            Set to draft
          </MenuItem>
        )}
      </Menu>

      {showEditModal && (
        <EditInfoModal row={row} onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
}
