import { memo } from "react";
import { useFunctions } from "./useFunctions";

export const AnalyticsOeeScreen = memo(() => {
  const { loading, summary } = useFunctions();

  if (!summary) {
    return (
      <div className="p-8 text-center text-slate-400">
        {loading ? "Loading Dashboard..." : "No data available."}
      </div>
    );
  }

  const yieldRate = summary.today_yield_rate;

  return (
    <div className="p-8 space-y-8">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">
            MES Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time overview of manufacturing operations, machine states, and
            production yield.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full font-semibold">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          Live Monitoring Active
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Today's Output
          </p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-white">
              {summary.today_output}
            </h3>
            <span className="text-xs text-slate-500">pcs</span>
          </div>
          <p className="text-xs text-slate-500">Total units produced today</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Today's Defects
          </p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-rose-400">
              {summary.today_defects}
            </h3>
            <span className="text-xs text-rose-500/80">pcs</span>
          </div>
          <p className="text-xs text-slate-500">
            Rejected during quality checks
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Yield Rate
          </p>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-emerald-400">
              {yieldRate.toFixed(1)}%
            </h3>
          </div>
          {/* Micro Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-1.5 rounded-full"
              style={{ width: `${Math.min(yieldRate, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Work Orders
          </p>
          <div className="flex items-center gap-4">
            <div>
              <h3 className="text-2xl font-black text-white">
                {summary.total_work_orders}
              </h3>
              <p className="text-xs text-slate-500">Total</p>
            </div>
            <div className="border-l border-slate-800 h-8 self-center" />
            <div>
              <h3 className="text-lg font-bold text-indigo-400">
                {summary.work_orders_in_progress}
              </h3>
              <p className="text-xs text-slate-500">Active</p>
            </div>
            <div className="border-l border-slate-800 h-8 self-center" />
            <div>
              <h3 className="text-lg font-bold text-emerald-400">
                {summary.work_orders_completed_today}
              </h3>
              <p className="text-xs text-slate-500">Done</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Machine Status & Recent Work Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Machine Statuses list */}
        <div className="xl:col-span-1 bg-slate-900/20 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800/80 pb-3">
            <h2 className="text-lg font-extrabold text-white">
              Machine Monitoring
            </h2>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                {summary.machines_running} Run
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/10">
                {summary.machines_idle} Idle
              </span>
            </div>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {summary.machine_statuses.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">
                No machines registered.
              </p>
            ) : (
              summary.machine_statuses.map((m) => {
                let statusColor = "bg-slate-500 text-slate-300";
                if (m.status === "Running")
                  statusColor =
                    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                else if (m.status === "Idle")
                  statusColor =
                    "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                else if (m.status === "Maintenance")
                  statusColor =
                    "bg-sky-500/10 text-sky-400 border border-sky-500/20";
                else if (m.status === "Error")
                  statusColor =
                    "bg-rose-500/10 text-rose-400 border border-rose-500/20";

                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/40 border border-slate-850 hover:border-slate-800 transition-all"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{m.name}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        {m.code}
                      </p>
                      {m.current_work_order && (
                        <p className="text-xs text-indigo-400 mt-1">
                          ↳ Order:{" "}
                          <span className="font-semibold">
                            {m.current_work_order}
                          </span>
                        </p>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${statusColor}`}
                    >
                      {m.status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Work Orders */}
        <div className="xl:col-span-2 bg-slate-900/20 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-extrabold text-white border-b border-slate-800/80 pb-3">
            Active & Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-semibold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                  <th className="pb-3 pr-4">Order No.</th>
                  <th className="pb-3 pr-4">Product / Machine</th>
                  <th className="pb-3 pr-4">Progress</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
                {summary.recent_work_orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-slate-500">
                      No recent work orders.
                    </td>
                  </tr>
                ) : (
                  summary.recent_work_orders.map((wo) => {
                    const percent =
                      wo.target_quantity > 0
                        ? (wo.produced_quantity / wo.target_quantity) * 100
                        : 0;
                    let badgeColor =
                      "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                    if (wo.status === "InProgress")
                      badgeColor =
                        "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
                    else if (wo.status === "Completed")
                      badgeColor =
                        "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                    else if (wo.status === "Pending")
                      badgeColor =
                        "bg-amber-500/10 text-amber-400 border border-amber-500/20";

                    return (
                      <tr
                        key={wo.id}
                        className="hover:bg-slate-900/10 transition-all"
                      >
                        <td className="py-4 pr-4 font-mono font-bold text-white">
                          {wo.order_number}
                        </td>
                        <td className="py-4 pr-4">
                          <p className="font-semibold text-slate-200">
                            {wo.product_name}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Machine: {wo.machine_name}
                          </p>
                        </td>
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-slate-800 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${Math.min(percent, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                              {wo.produced_quantity} / {wo.target_quantity} (
                              {percent.toFixed(0)}%)
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <span
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}
                          >
                            {wo.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});
