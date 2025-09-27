import { useEffect } from "react";
import Announcement from "./Announcement";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLatest, loadLatest } from "./announcementsSlice";

function Announcements() {
  const dispatch = useAppDispatch();
  const { latest, loading } = useAppSelector(getLatest);

  useEffect(() => {
    if (!latest || latest.length === 0) {
      dispatch(loadLatest());
    }
  }, [latest, dispatch]);

  return (
    <section className="mt-8 bg-white p-6 rounded-2xl shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-700">Announcements</h2>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
        <button className="text-gradient-2 font-bold text-sm px-4 py-2 rounded-lg shadow-md hover:opacity-95 transition">
          All
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {latest.map((announcement) => (
        <Announcement
          key={announcement._id}
          instructor={announcement.author}
          content={announcement.content}
          course={announcement.course.name}
        />
      ))}
    </section>
  );
}

export default Announcements;
