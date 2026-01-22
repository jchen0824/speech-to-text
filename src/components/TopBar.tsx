const TopBar = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
          MS
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Session
          </p>
          <p className="text-base font-semibold text-slate-900">Meeting Scribe</p>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Listening
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-700"
          type="button"
        >
          <span className="material-symbols-outlined text-xl">help</span>
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-700"
          type="button"
        >
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400" />
      </div>
    </header>
  );
};

export default TopBar;
