import Announcements from "../features/announcements/Announcements";
import ExamsTimeBanner from "../ui/ExamsTimeBanner";

export default function Dashboard() {
  return (
    <div className="overflow-y-auto w-full h-[calc(100vh-86px)] p-5">
      <ExamsTimeBanner />
      <Announcements />
    </div>
  );
}
