import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TranscriptPane from "./components/TranscriptPane";

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <TopBar />
      <main className="flex flex-1">
        <TranscriptPane />
        <Sidebar />
      </main>
    </div>
  );
}

export default App;
