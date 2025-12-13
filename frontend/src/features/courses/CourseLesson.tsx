import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ReactPlayer from "react-player";
import CourseOverview from "./CourseOverview";
import CourseResources from "./CourseResources";
import { useCourseLesson } from "../../hooks/useCourseLessons";

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
}: {
  selectedLessonId?: string | null;
}) {
  const [tabValue, setTabValue] = useState(0);

  const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const { data: lesson, isLoading } = useCourseLesson(selectedLessonId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!lesson) {
    return <div>Please select a lesson.</div>;
  }

  return (
    <Box sx={{ width: "100%", borderRadius: 2 }}>
      <ReactPlayer src={lesson?.video} controls width="100%" height="90%" />
      <Tabs
        value={tabValue}
        onChange={onTabChange}
        sx={{ backgroundColor: "white" }}
      >
        <Tab label="Overview" />
        <Tab label="Resources" />
        <Tab label="Discussion" />
      </Tabs>
      <CustomTabPanel value={tabValue} index={0}>
        <CourseOverview lesson={lesson} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <CourseResources lesson={lesson} />
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={2}>
        Soon
      </CustomTabPanel>
    </Box>
  );
}

export default CourseLesson;
