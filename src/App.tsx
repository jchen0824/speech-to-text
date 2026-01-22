import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TranscriptPane from "./components/TranscriptPane";
import Toast from "./components/Toast";
import useTranscription from "./hooks/useTranscription";

function App() {
  const {
    isListening,
    items,
    liveText,
    filePath,
    fileName,
    isToastOpen,
    toastMessage,
    start,
    stop,
    copyAll,
    clear,
    changeFile,
  } = useTranscription();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <TopBar isListening={isListening} />
      <main className="flex flex-1">
        <TranscriptPane items={items} liveText={liveText} />
        <Sidebar
          isListening={isListening}
          filePath={filePath}
          fileName={fileName}
          onStart={start}
          onStop={stop}
          onCopyAll={copyAll}
          onClear={clear}
          onChangeFile={changeFile}
        />
      </main>
      <Toast message={toastMessage} isOpen={isToastOpen} />
    </div>
  );
}

export default App;
