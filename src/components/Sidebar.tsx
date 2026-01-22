const Sidebar = () => {
  return (
    <aside className="hidden w-80 flex-col gap-6 border-l border-slate-200 bg-slate-50 px-6 py-6 lg:flex">
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Controls
        </h2>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 text-sm text-slate-500">
          Buttons will live here.
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          File Output
        </h2>
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 text-sm text-slate-500">
          Destination details will live here.
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
