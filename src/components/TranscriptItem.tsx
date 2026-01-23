import type { TranscriptItem as TranscriptItemType } from "../types/transcript";

type TranscriptItemProps = {
  item: TranscriptItemType;
};

const TranscriptItem = ({ item }: TranscriptItemProps) => {
  return (
    <div className="flex gap-4 group">
      <div className="w-8 shrink-0 flex flex-col items-center pt-1">
        <span className="text-xs text-slate-400 font-mono">{item.time}</span>
      </div>
      <div className="flex-1">
        <p className="text-slate-900 dark:text-slate-100 text-base md:text-lg leading-relaxed">
          {item.text}
        </p>
      </div>
    </div>
  );
};

export default TranscriptItem;
