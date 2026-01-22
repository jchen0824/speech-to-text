import type { TranscriptItem as TranscriptItemType } from "../types/transcript";

type TranscriptItemProps = {
  item: TranscriptItemType;
};

const TranscriptItem = ({ item }: TranscriptItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="w-10 shrink-0 pt-1 text-right">
        <span className="text-xs font-mono text-slate-400">{item.time}</span>
      </div>
      <div className="flex-1 text-slate-700">
        <p className="text-base leading-relaxed">{item.text}</p>
      </div>
    </div>
  );
};

export default TranscriptItem;
