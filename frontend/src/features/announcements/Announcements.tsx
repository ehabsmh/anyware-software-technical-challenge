import { useEffect } from "react";
import Announcement from "./Announcement";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAnnouncementsInfo,
  getLatest,
  loadLatest,
} from "./announcementsSlice";
import { Link } from "react-router-dom";

function Announcements() {
  const dispatch = useAppDispatch();
  const latest = useAppSelector(getLatest);
  const { hasError, isLoading } = useAppSelector(getAnnouncementsInfo);

  useEffect(() => {
    if (!latest || latest.length === 0) {
      dispatch(loadLatest());
    }
  }, [latest, dispatch]);

  return (
    <section className="bg-white lg:p-6 p-2 rounded-2xl shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-700">Announcements</h2>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
        <Link
          to="/announcements"
          className="text-gradient-2 font-bold text-sm px-4 py-2 rounded-lg shadow-md hover:opacity-95 transition"
        >
          All
        </Link>
      </div>
      {isLoading && <div>Loading...</div>}
      {hasError && <div className="text-red-500">Failed to load data.</div>}
      {latest.map((announcement) => (
        <Announcement
          key={announcement._id}
          instructor={announcement.author}
          content={announcement.content}
          course={"General"}
        />
      ))}
    </section>
  );
}

export default Announcements;
