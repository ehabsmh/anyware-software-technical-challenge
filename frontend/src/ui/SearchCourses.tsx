import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Search from "./Search";
import { useTranslation } from "react-i18next";

function SearchCourses({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue] = useDebounce(searchTerm, 800);

  useEffect(() => {
    onSearch(debouncedValue.trim());
  }, [debouncedValue, onSearch]);

  return (
    <Search
      label={t("instructorCoursesPage.searchCoursesInputLabel")}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchCourses;
