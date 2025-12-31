import { Box, Button, Tab, Tabs, useMediaQuery } from "@mui/material";
import { useState } from "react";
import ReactPlayer from "react-player";
import CourseOverview from "./CourseOverview";
import CourseResources from "./CourseResources";
import { useCourseLesson } from "../../hooks/useCourseLessons";
import { ArrowCircleRight } from "@mui/icons-material";
import type { ICourseLessonPopulated } from "../../interfaces/courseLesson";
import { useTranslation } from "react-i18next";
import CourseLessonSkeleton from "../../skeletons/CourseLessonSkeleton";
import LessonNote from "../notes/LessonNote";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function CourseLesson({
  selectedLessonId,
  toggleDrawer,
  courseOverview,
}: {
  selectedLessonId?: string | null;
  toggleDrawer: (newOpen: boolean) => void;
  courseOverview: ICourseLessonPopulated["courseDetails"];
}) {
  const { t } = useTranslation();

  const [tabValue, setTabValue] = useState(0);

  const isMobile = useMediaQuery("(max-width:1024px)");

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { data: lesson, isLoading } = useCourseLesson(
    selectedLessonId!,
    courseOverview._id
  );

  if (isLoading) {
    return <CourseLessonSkeleton />;
  }

  if (!lesson) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", borderRadius: 2 }}>
      {isMobile && (
        <div onClick={() => toggleDrawer(true)}>
          <ArrowCircleRight
            sx={{ color: "var(--color-gradient-2)", fontSize: 30 }}
          />
          <Button sx={{ color: "var(--color-gradient-2)" }}>
            Show Content
          </Button>
        </div>
      )}
      {isMobile && (
        <h2 className="font-bold text-xl p-3">
          {lesson?.order}. {lesson?.title}
        </h2>
      )}
      <ReactPlayer
        src={lesson?.video}
        controls
        style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
      />
      <Tabs
        value={tabValue}
        onChange={onTabChange}
        sx={{
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <Tab label={t("courseLessons.courseLesson.overviewTabLabel")} />
        <Tab label={t("courseLessons.courseLesson.resourcesTabLabel")} />
        <Tab label="Note" />
        <Tab label={t("courseLessons.courseLesson.discussionTabLabel")} />
      </Tabs>
      <CustomTabPanel value={tabValue} index={0}>
        <CourseOverview courseOverview={courseOverview} lesson={lesson} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <CourseResources lesson={lesson} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        <LessonNote lesson={lesson} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={3}>
        Soon
      </CustomTabPanel>
    </Box>
  );
}

export default CourseLesson;
