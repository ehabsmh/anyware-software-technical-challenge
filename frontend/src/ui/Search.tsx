import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <Paper
      component="form"
      sx={{
        p: "0 4px",
        display: "flex",
        alignItems: "center",
        width: 280,
        borderRadius: 10,
        boxShadow: "0 0 0px",
        border: "1px solid lightgray",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </Paper>
  );
}
