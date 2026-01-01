import { GrAnnounce, GrDocumentTest, GrUserAdmin } from "react-icons/gr";
import { LuLetterText } from "react-icons/lu";
import { BiHome } from "react-icons/bi";

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
    { to: "/student/dashboard", label: "dashboard", icon: BiHome },
    { to: "/student/courses", label: "courses", icon: LuLetterText },
    { to: "/student/announcements", label: "announcements", icon: GrAnnounce },
    {
      to: "/student/submitted-quizzes",
      label: "quizzes",
      icon: GrDocumentTest,
    },
    // { to: "/schedule", label: "Schedule", icon: GrSchedule },
    // { to: "/gradebook", label: "GradeBook", icon: GiGraduateCap },
    // { to: "/performance", label: "Performance", icon: BiChart },
  ],

  instructor: [
    // { to: "/instructor/dashboard", label: "dashboard", icon: BiHome },
    {
      to: "/instructor/courses",
      label: "courses",
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
      label: "quizzes",
      icon: GrDocumentTest,
      subLinks: [
        {
          to: "/instructor/quizzes/create",
          label: "create",
          icon: GrDocumentTest,
        },
        {
          to: "/instructor/quizzes/manage",
          label: "manage",
          icon: GrDocumentTest,
        },
      ],
    },
    {
      to: "/instructor/announcements",
      label: "announcements",
      icon: GrAnnounce,
      subLinks: [
        {
          to: "/instructor/announcements/create",
          label: "create",
          icon: GrAnnounce,
        },
        {
          to: "/instructor/announcements/view",
          label: "view",
          icon: GrAnnounce,
        },
      ],
    },
    // {
    //   to: "/instructor/students",
    //   label: "students",
    //   icon: GiGraduateCap,
    //   subLinks: [
    //     {
    //       to: "/instructor/students/list",
    //       label: "student list",
    //       icon: GiGraduateCap,
    //     },
    //     {
    //       to: "/instructor/students/performance",
    //       label: "performance",
    //       icon: BiChart,
    //     },
    //   ],
    // },
  ],
};
