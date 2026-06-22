import { memo } from "react";
import { useFunctions } from "./useFunctions";

export const MachinesListScreen = memo(() => {
  const {
    loading,
    machines,
    search,
    isModalOpen,
    name,
    code,
    location,
    setName,
    setCode,
    setLocation,
    onSearchChange,
    openCreateModal,
    closeCreateModal,
    handleCreateMachine,
    handleStatusChange,
  } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">Machines</h1>
          <p className="text-sm text-slate-400 mt-1">Monitor operational statuses, code profiles, and plant floor locations of machines.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
        >
          + Register Machine
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-slate-900/30 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search by name or code..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Machine Name</th>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Status Controller</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
            {machines.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  {loading ? "Loading machines..." : "No machines found."}
                </td>
              </tr>
            ) : (
              machines.map((m) => {
                let statusColor = "bg-slate-500 text-slate-300";
                if (m.status === "Running") statusColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                else if (m.status === "Idle") statusColor = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                else if (m.status === "Maintenance") statusColor = "bg-sky-500/10 text-sky-400 border border-sky-500/20";
                else if (m.status === "Error") statusColor = "bg-rose-500/10 text-rose-400 border border-rose-500/20";

                return (
                  <tr key={m.id} className="hover:bg-slate-900/30 transition-all">
                    <td className="px-6 py-4 font-semibold text-white">{m.name}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono bg-slate-800 text-indigo-300 px-2.5 py-1 rounded text-xs">
                        {m.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{m.location || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={m.status}
                        onChange={(e) => handleStatusChange(m.id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="Idle">Idle</option>
                        <option value="Running">Running</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Error">Error</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Register New Machine</h3>
              <button
                onClick={closeCreateModal}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateMachine} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Machine Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CNC Milling Machine A"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Machine Code *
                </label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. CNC-001"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Location (Floor/Section)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Section B, Floor 2"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer"
                >
                  {loading ? "Registering..." : "Save Machine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});
