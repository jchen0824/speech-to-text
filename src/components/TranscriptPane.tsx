import LiveTranscriptItem from "./LiveTranscriptItem";
import TranscriptItem from "./TranscriptItem";
import type { TranscriptItem as TranscriptItemType } from "../types/transcript";

type TranscriptPaneProps = {
  items?: TranscriptItemType[];
  liveText?: string;
};

const formatTodayLabel = (date = new Date()) => {
  const formatted = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return `Today, ${formatted}`;
};

const TranscriptPane = ({ items = [], liveText = "" }: TranscriptPaneProps) => {
  const todayLabel = formatTodayLabel();
  return (
    <section className="relative flex flex-1 flex-col min-w-0 bg-background-light dark:bg-background-dark">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 scroll-smooth">
        <div className="max-w-4xl mx-auto flex flex-col gap-6 min-h-full pb-20">
          <div className="flex items-center gap-4 py-4">
            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {todayLabel}
            </span>
            <div className="h-px bg-slate-300 dark:bg-slate-700 flex-1" />
          </div>
          {items.map((item) => (
            <TranscriptItem key={item.id} item={item} />
          ))}
          {liveText ? <LiveTranscriptItem text={liveText} /> : null}
          <div className="h-10" />
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 lg:hidden">
        <button
          className="h-14 w-14 rounded-full bg-red-500 shadow-lg shadow-red-500/20 flex items-center justify-center text-white hover:scale-105 transition-transform"
          type="button"
          aria-label="Stop recording"
        >
          <span
            className="material-symbols-outlined text-[28px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            stop
          </span>
        </button>
      </div>
    </section>
  );
};

export default TranscriptPane;
