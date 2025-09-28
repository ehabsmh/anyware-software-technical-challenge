import Announcements from "../features/announcements/Announcements";
import WhatsDue from "../features/quizzes/WhatsDue";
import ExamsTimeBanner from "../ui/ExamsTimeBanner";

export default function Dashboard() {
  return (
    <div className="overflow-y-auto w-full h-[calc(100vh-86px)] p-5">
      <ExamsTimeBanner />
      <div className="grid grid-cols-3 gap-6">
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
