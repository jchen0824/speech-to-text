const TranscriptPane = () => {
  return (
    <section className="flex flex-1 flex-col gap-4 px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Transcript
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Live meeting notes
          </h2>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
          Draft
        </div>
      </div>

      <div className="flex min-h-[420px] flex-1 flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <span>Today</span>
          <span>10:02 AM</span>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 text-sm text-slate-500">
          <p className="leading-relaxed">
            Transcript items will appear here as the meeting progresses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TranscriptPane;
