import { memo } from "react";
import { useFunctions } from "./useFunctions";

export const MachinesMonitoringScreen = memo(() => {
  const { loading, machines, updateMachineStatus } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">Live Machine Status</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time status board of all production equipment on the workshop floor.</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-full font-semibold">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
          Uptime Engine Active
        </div>
      </div>

      {/* Grid of machines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {machines.length === 0 ? (
          <div className="col-span-full text-center py-10 text-slate-500 bg-slate-900/10 border border-slate-800 rounded-2xl">
            {loading ? "Loading telemetry..." : "No machines registered."}
          </div>
        ) : (
          machines.map((m) => {
            let statusText = m.status;
            let badgeBg = "bg-slate-950/60 border-slate-800";
            let ledColor = "bg-slate-400";
            let textColor = "text-slate-400";

            if (m.status === "Running") {
              badgeBg = "bg-emerald-950/20 border-emerald-500/30";
              ledColor = "bg-emerald-400 animate-pulse";
              textColor = "text-emerald-400";
            } else if (m.status === "Idle") {
              badgeBg = "bg-amber-950/20 border-amber-500/30";
              ledColor = "bg-amber-400";
              textColor = "text-amber-400";
            } else if (m.status === "Maintenance") {
              badgeBg = "bg-sky-950/20 border-sky-500/30";
              ledColor = "bg-sky-400 animate-pulse";
              textColor = "text-sky-400";
            } else if (m.status === "Error") {
              badgeBg = "bg-rose-950/20 border-rose-500/30";
              ledColor = "bg-rose-500 animate-ping";
              textColor = "text-rose-400 font-bold";
            }

            return (
              <div
                key={m.id}
                className={`relative flex flex-col justify-between p-6 rounded-2xl border ${badgeBg} shadow-lg transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm`}
              >
                {/* Header status */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{m.name}</h3>
                    <span className="font-mono text-xs text-slate-500 mt-1 block">{m.code}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-slate-900 border border-slate-800 rounded-full px-2.5 py-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${ledColor}`} />
                    <span className={textColor}>{statusText}</span>
                  </span>
                </div>

                {/* Details */}
                <div className="my-6 space-y-1">
                  <p className="text-xs text-slate-500">
                    Location: <span className="text-slate-300 font-medium">{m.location || "Not assigned"}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Health Check: <span className={m.status === "Error" ? "text-rose-400" : "text-emerald-400"}>{m.status === "Error" ? "CRITICAL" : "OK"}</span>
                  </p>
                </div>

                {/* Control Panel */}
                <div className="border-t border-slate-850 pt-4 flex gap-2">
                  <button
                    onClick={() => updateMachineStatus(m.id, "Running")}
                    disabled={m.status === "Running"}
                    className="flex-1 rounded-lg bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600/20 disabled:opacity-30 disabled:hover:bg-emerald-600/10 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Run
                  </button>
                  <button
                    onClick={() => updateMachineStatus(m.id, "Idle")}
                    disabled={m.status === "Idle"}
                    className="flex-1 rounded-lg bg-amber-600/10 text-amber-400 border border-amber-500/20 hover:bg-amber-600/20 disabled:opacity-30 disabled:hover:bg-amber-600/10 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Idle
                  </button>
                  <button
                    onClick={() => updateMachineStatus(m.id, "Error")}
                    disabled={m.status === "Error"}
                    className="flex-1 rounded-lg bg-rose-600/10 text-rose-400 border border-rose-500/20 hover:bg-rose-600/20 disabled:opacity-30 disabled:hover:bg-rose-600/10 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Stop
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});
