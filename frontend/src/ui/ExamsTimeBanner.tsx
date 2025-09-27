function ExamsTimeBanner() {
  return (
    <section className="mt-8 w-full rounded-2xl bg-gradient-to-r from-gradient-1 to-gradient-2 text-white p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-start gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            Exams Time
          </h2>
          <p className="mt-1 text-sm md:text-base opacity-90">
            Here we are, Are you ready to fight? Don't worry, we prepared some
            tips to be ready for your exams.
          </p>
          <p className="mt-2 text-xs md:text-sm text-white/90 italic">
            "Nothing happens until something moves." - Albert Einstein
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
        <button className="bg-white text-gradient-1 font-semibold rounded-lg px-4 py-2 md:px-5 md:py-3 shadow-md hover:opacity-95 transition">
          View exams tips
        </button>
      </div>
    </section>
  );
}

export default ExamsTimeBanner;
