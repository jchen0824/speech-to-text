type LiveTranscriptItemProps = {
  text: string;
};

const LiveTranscriptItem = ({ text }: LiveTranscriptItemProps) => {
  return (
    <div className="flex gap-4 group">
      <div className="w-8 shrink-0 flex flex-col items-center pt-1">
        <span className="text-xs text-primary font-mono font-bold">LIVE</span>
      </div>
      <div className="flex-1">
        <p className="text-base md:text-lg leading-relaxed text-slate-900 dark:text-slate-100">
          {text}
          <span className="inline-block w-2 h-5 bg-primary align-middle ml-1 animate-pulse rounded-sm" />
        </p>
      </div>
    </div>
  );
};

export default LiveTranscriptItem;
