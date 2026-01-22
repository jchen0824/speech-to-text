type LiveTranscriptItemProps = {
  text: string;
};

const LiveTranscriptItem = ({ text }: LiveTranscriptItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex w-10 shrink-0 items-start justify-end pt-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
      </div>
      <div className="flex-1">
        <p className="text-base leading-relaxed">
          <span className="italic text-slate-500">{text}</span>
          <span className="ml-1 inline-block h-5 w-2 animate-pulse rounded-sm bg-blue-500 align-middle" />
        </p>
      </div>
    </div>
  );
};

export default LiveTranscriptItem;
