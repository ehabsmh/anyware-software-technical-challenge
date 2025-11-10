import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

function SearchCourses({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue] = useDebounce(searchTerm, 800);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 250,
        height: 40,
      }}
    >
      <SearchIcon />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Courses by name"
        inputProps={{ "aria-label": "search Course by name" }}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
    </Paper>
  );
}

export default SearchCourses;
