# Navbar

### Problems

1. Navbar component is doing too many things (layout + responsive + routing logic).
2. Drawer and fixed navbar share the same content but rendered in two different places.
3. Responsive logic mixed directly inside JSX, making it harder to read.
4. Hard to control spacing and styling consistency between main and sub items.

### Changes

1. Simplified conditional rendering for mobile vs desktop.
2. Centralized spacing control inside MUI `List` instead of random margins.
3. Cleaned JSX and removed unnecessary fragments.

### Result

- Cleaner Navbar component.
- No duplicated markup.
- Easier to adjust spacing and styles.
- Better separation of responsibilities.

---

# Courses

### Courses Page

- Simplified component by extracting filters into a separate component `CoursesFilters`.
- Centralized current semester logic into a reusable hook.
- Fixed pagination behavior when filters change.
- Improved handling of loading, empty, and data states.

### CourseCard

- Component is reusable and well-isolated

- Role-based UI handled cleanly

- Navigation logic should be delegated to parent

- Description rendering logic can be simplified for readability

### Course Form

- Separated Create/Edit logic from the form UI.

- Introduced a reusable CourseForm component.

- Used FormProvider + useFormContext to avoid prop drilling.

- Unified backend validation error handling using applyValidationErrors.

- Improved overall readability and maintainability.

---

# Announcements

### Announcement Form

- Extracted all form UI and logic into a single reusable AnnouncementForm.

- Used FormProvider + useFormContext to avoid prop drilling.

- Standardized backend validation handling using applyValidationErrors.

- Replaced multiple API calls with a single useSemesters({ includeCourses: true }).

- Simplified dependent selects:

  - Semester select controls available courses.

  - Courses are derived from selected semester, not fetched separately.

  - Introduced a reusable FormSelect component for controlled MUI selects.

  - Removed unnecessary local state in favor of react-hook-form state.

---

# Quizzes

### Quiz Form

- Replaced multiple API calls with a single useSemesters({ includeCourses: true }).

- Simplified dependent selects:

  - Semester select controls available courses.

  - Courses are derived from selected semester, not fetched separately.

  - Introduced a reusable FormSelect component for controlled MUI selects.

  - Removed unnecessary local state in favor of react-hook-form state.
