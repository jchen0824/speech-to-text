import ControlsPanel from "./ControlsPanel";
import FileOutputCard from "./FileOutputCard";

type SidebarProps = {
  isListening: boolean;
  filePath: string;
  fileName: string;
  onStart?: () => void;
  onStop?: () => void;
  onCopyAll?: () => void;
  onClear?: () => void;
  onChangeFile?: () => void;
};

const Sidebar = ({
  isListening,
  filePath,
  fileName,
  onStart,
  onStop,
  onCopyAll,
  onClear,
  onChangeFile,
}: SidebarProps) => {
  return (
    <aside className="hidden w-80 flex-col border-l border-slate-200 bg-white lg:flex">
      <div className="flex h-full flex-col gap-8 p-6">
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Controls
          </h2>
          <ControlsPanel
            isListening={isListening}
            onStart={onStart}
            onStop={onStop}
            onCopyAll={onCopyAll}
            onClear={onClear}
          />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            File Output
          </h2>
          <FileOutputCard
            filePath={filePath}
            fileName={fileName}
            onChange={onChangeFile}
          />
          <div className="flex items-center gap-2 px-1 text-xs text-slate-500">
            <span className="material-symbols-outlined text-base text-slate-400">
              timer
            </span>
            Autosaves every 30 seconds
          </div>
        </section>

        <div className="flex-1" />

        <div className="pb-2 text-center text-[10px] text-slate-400">
          Version 1.0.4 • Chrome Recommended
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
