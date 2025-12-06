import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Search from "./Search";

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
    <Search
      label="Search Courses"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchCourses;
