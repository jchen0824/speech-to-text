type ControlsPanelProps = {
  isListening: boolean;
  onStart?: () => void;
  onStop?: () => void;
  onCopyAll?: () => void;
  onClear?: () => void;
};

const ControlsPanel = ({
  isListening,
  onStart,
  onStop,
  onCopyAll,
  onClear,
}: ControlsPanelProps) => {
  const primaryLabel = isListening ? "Stop Recording" : "Start Recording";
  const primaryIcon = isListening ? "stop_circle" : "mic";
  const primaryClasses = isListening
    ? "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
    : "bg-blue-600 text-white border border-blue-600/20 hover:bg-blue-700";

  return (
    <div className="flex flex-col gap-4">
        <button
          className={`group flex h-12 w-full items-center justify-center gap-3 rounded-xl transition-all ${primaryClasses}`}
          type="button"
          onClick={isListening ? onStop : onStart}
        >
        <span
          className="material-symbols-outlined transition-transform group-hover:scale-110"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {primaryIcon}
        </span>
        <span className="font-semibold">{primaryLabel}</span>
      </button>

      <div className="grid grid-cols-2 gap-3">
        <button
          className="flex h-20 flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:bg-[#282e39]"
          type="button"
          onClick={onCopyAll}
        >
          <span className="material-symbols-outlined">content_copy</span>
          <span className="text-xs font-medium">Copy All</span>
        </button>
        <button
          className="flex h-20 flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-[#1e293b] dark:text-slate-300 dark:hover:border-red-900/30 dark:hover:bg-red-900/10 dark:hover:text-red-400"
          type="button"
          onClick={onClear}
        >
          <span className="material-symbols-outlined">delete</span>
          <span className="text-xs font-medium">Clear</span>
        </button>
      </div>
    </div>
  );
};

export default ControlsPanel;
