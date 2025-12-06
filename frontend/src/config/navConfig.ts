import { GrAnnounce, GrDocumentTest, GrUserAdmin } from "react-icons/gr";
import { LuLetterText } from "react-icons/lu";
import { BiHome, BiChart } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { FactCheck } from "@mui/icons-material";

export const navConfig = {
  admin: [
    {
      to: "/admin/accounts",
      label: "Accounts",
      icon: GrUserAdmin,
      subLinks: [
        { to: "/admin/accounts/add", label: "Add Account", icon: GrUserAdmin },
        {
          to: "/admin/accounts/display",
          label: "Display Accounts",
          icon: GrUserAdmin,
        },
      ],
    },
    {
      to: "/admin/announcements",
      label: "Announcements",
      icon: GrAnnounce,
      subLinks: [
        {
          to: "/admin/announcements/create",
          label: "Create",
          icon: GrAnnounce,
        },
        { to: "/admin/announcements/view", label: "View", icon: GrAnnounce },
      ],
    },
    {
      to: "/admin/courses",
      label: "Courses",
      icon: LuLetterText,
    },
    {
      to: "/admin/quizzes",
      label: "Quizzes",
      icon: GrDocumentTest,
    },
  ],

  student: [
    { to: "/student/dashboard", label: "Dashboard", icon: BiHome },
    { to: "/student/courses", label: "Courses", icon: LuLetterText },
    { to: "/student/announcements", label: "Announcements", icon: GrAnnounce },
    {
      to: "/student/submitted-quizzes",
      label: "Quizzes",
      icon: GrDocumentTest,
    },
    // { to: "/schedule", label: "Schedule", icon: GrSchedule },
    // { to: "/gradebook", label: "GradeBook", icon: GiGraduateCap },
    // { to: "/performance", label: "Performance", icon: BiChart },
  ],

  instructor: [
    { to: "/instructor/dashboard", label: "Dashboard", icon: BiHome },
    {
      to: "/instructor/courses",
      label: "Courses",
      icon: LuLetterText,
      subLinks: [
        {
          to: "/instructor/courses/my-courses",
          label: "My Courses",
          icon: LuLetterText,
        },
        {
          to: "/instructor/courses/create",
          label: "Create Course",
          icon: LuLetterText,
        },
      ],
    },
    {
      to: "/instructor/quizzes",
      label: "Quizzes",
      icon: GrDocumentTest,
      subLinks: [
        {
          to: "/instructor/quizzes/create",
          label: "Create Quiz",
          icon: GrDocumentTest,
        },
        {
          to: "/instructor/quizzes/manage",
          label: "Manage Quizzes",
          icon: GrDocumentTest,
        },
        {
          to: "/instructor/quizzes/corrections",
          label: "Corrections",
          icon: FactCheck,
        },
      ],
    },
    {
      to: "/instructor/announcements",
      label: "Announcements",
      icon: GrAnnounce,
      subLinks: [
        {
          to: "/instructor/announcements/create",
          label: "Create",
          icon: GrAnnounce,
        },
        {
          to: "/instructor/announcements",
          label: "View",
          icon: GrAnnounce,
        },
      ],
    },
    {
      to: "/instructor/students",
      label: "Students",
      icon: GiGraduateCap,
      subLinks: [
        {
          to: "/instructor/students/list",
          label: "Student List",
          icon: GiGraduateCap,
        },
        {
          to: "/instructor/students/performance",
          label: "Performance",
          icon: BiChart,
        },
      ],
    },
  ],
};
