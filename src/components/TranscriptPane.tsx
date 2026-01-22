import LiveTranscriptItem from "./LiveTranscriptItem";
import TranscriptItem from "./TranscriptItem";
import type { TranscriptItem as TranscriptItemType } from "../types/transcript";

type TranscriptPaneProps = {
  items?: TranscriptItemType[];
  liveText?: string;
};

const TranscriptPane = ({ items = [], liveText = "" }: TranscriptPaneProps) => {
  return (
    <section className="flex flex-1 flex-col gap-4 px-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Transcript
          </p>
          <h2 className="text-lg font-semibold text-slate-900">Meeting notes</h2>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
          Draft
        </div>
      </div>

      <div className="flex min-h-[420px] flex-1 flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Today, Oct 24
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <TranscriptItem key={item.id} item={item} />
            ))}
            {liveText ? <LiveTranscriptItem text={liveText} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranscriptPane;
