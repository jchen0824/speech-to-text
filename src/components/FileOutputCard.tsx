type FileOutputCardProps = {
  filePath: string;
  fileName: string;
  onChange?: () => void;
};

const FileOutputCard = ({ filePath, fileName, onChange }: FileOutputCardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <span className="material-symbols-outlined mt-0.5 text-slate-400">
          folder_open
        </span>
        <div className="min-w-0">
          <span className="text-xs text-slate-500">Saving to:</span>
          <span
            className="block truncate text-sm font-medium text-slate-700"
            title={filePath}
          >
            {filePath}
          </span>
        </div>
      </div>
      <div className="h-px w-full bg-slate-200" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{fileName}</span>
        <button
          className="text-xs font-bold text-blue-600 transition-colors hover:text-blue-500"
          type="button"
          onClick={onChange}
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default FileOutputCard;
