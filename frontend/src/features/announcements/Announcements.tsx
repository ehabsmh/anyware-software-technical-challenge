import { useTranslation } from "react-i18next";
import { useLatestAnnouncements } from "../../hooks/useAnnouncements";
import Announcement from "./Announcement";
import { Link } from "react-router-dom";
import LatestAnnouncementsSkeleton from "../../skeletons/latestAnnouncementsSkeleton";

function Announcements() {
  const { t } = useTranslation();
  const { data: latest, isLoading, isError } = useLatestAnnouncements();

  return (
    <section className="bg-white lg:p-6 p-2 rounded-2xl shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-700">
            {t("dashboard.announcements.title")}
          </h2>
          <p className="text-sm text-gray-400">
            {t("dashboard.announcements.description")}
          </p>
        </div>
        <Link
          to="/announcements"
          className="text-gradient-2 font-bold text-sm px-4 py-2 rounded-lg shadow-md hover:opacity-95 transition"
        >
          {t("dashboard.announcements.viewAllButtonText")}
        </Link>
      </div>
      {isError && <div className="text-red-500">Failed to load data.</div>}
      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <LatestAnnouncementsSkeleton key={i} />
          ))
        : latest?.map((announcement) => (
            <Announcement
              key={announcement._id}
              author={announcement.author}
              content={announcement.content}
              course={announcement.course}
            />
          ))}
    </section>
  );
}

export default Announcements;
