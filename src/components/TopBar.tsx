type TopBarProps = {
  isListening: boolean;
};

const TopBar = ({ isListening }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 bg-surface-light px-6 py-3 dark:border-[#282e39] dark:bg-[#111318]">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
          <span className="material-symbols-outlined text-[24px]">
            graphic_eq
          </span>
        </div>
        <h2 className="hidden text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white sm:block">
          Meeting Scribe
        </h2>
        {isListening ? (
          <div className="ml-2 flex h-7 items-center gap-2 rounded-full bg-slate-100 pl-2 pr-3 text-xs font-medium text-slate-600 dark:bg-[#282e39] dark:text-slate-200">
            <span
              className="material-symbols-outlined text-[14px] text-emerald-500 animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              fiber_manual_record
            </span>
            Listening...
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-[#282e39] dark:hover:text-slate-200"
          type="button"
          aria-label="Help"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-[#282e39] dark:hover:text-slate-200"
          type="button"
          aria-label="Settings"
        >
          <span className="material-symbols-outlined text-[20px]">
            settings
          </span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
      </div>
    </header>
  );
};

export default TopBar;
