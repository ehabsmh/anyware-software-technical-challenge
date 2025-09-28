import Announcements from "../features/announcements/Announcements";
import WhatsDue from "../features/quizzes/WhatsDue";
import ExamsTimeBanner from "../ui/ExamsTimeBanner";

export default function Dashboard() {
  return (
    <div className="overflow-y-auto w-full h-[calc(100vh-86px)] p-5">
      <ExamsTimeBanner />
      <div className="xl:grid xl:grid-cols-3 xl:gap-6 mt-5 space-y-6 xl:space-y-0">
        <div className="col-span-2">
          <Announcements />
        </div>
        <div>
          <WhatsDue />
        </div>
      </div>
    </div>
  );
}
