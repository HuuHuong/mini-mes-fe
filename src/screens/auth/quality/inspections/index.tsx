import { memo } from "react";
import dayjs from "dayjs";
import { useFunctions } from "./useFunctions";

export const QualityInspectionsScreen = memo(() => {
  const {
    loading,
    qualityChecks,
    workOrders,
    isModalOpen,
    selectedWorkOrderId,
    selectedProductId,
    inspectedQuantity,
    passedQuantity,
    failedQuantity,
    notes,
    setSelectedWorkOrderId,
    setSelectedProductId,
    setNotes,
    onInspectedQuantityChange,
    onPassedQuantityChange,
    openCreateModal,
    closeCreateModal,
    handleCreateQualityCheck,
  } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">Quality Inspections</h1>
          <p className="text-sm text-slate-400 mt-1">Audit logs, pass/fail items count, and QA inspections for manufacturing orders.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
        >
          + Record Quality Inspection
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Inspection ID</th>
              <th className="px-6 py-4">Order No.</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Inspected</th>
              <th className="px-6 py-4">Passed</th>
              <th className="px-6 py-4">Failed</th>
              <th className="px-6 py-4">Result</th>
              <th className="px-6 py-4">Inspector</th>
              <th className="px-6 py-4">Notes</th>
              <th className="px-6 py-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
            {qualityChecks.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-10 text-center text-slate-500">
                  {loading ? "Loading quality checks..." : "No quality checks recorded."}
                </td>
              </tr>
            ) : (
              qualityChecks.map((q) => {
                let badgeColor = "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                if (q.result === "Pass") badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                else if (q.result === "Fail") badgeColor = "bg-rose-500/10 text-rose-400 border border-rose-500/20";

                return (
                  <tr key={q.id} className="hover:bg-slate-900/30 transition-all">
                    <td className="px-6 py-4 font-mono text-slate-500">#{q.id}</td>
                    <td className="px-6 py-4 font-mono font-bold text-white">{q.order_number}</td>
                    <td className="px-6 py-4 font-semibold text-slate-300">{q.product_name}</td>
                    <td className="px-6 py-4 font-semibold">{q.inspected_quantity}</td>
                    <td className="px-6 py-4 text-emerald-400 font-semibold">{q.passed_quantity}</td>
                    <td className="px-6 py-4 text-rose-400 font-semibold">{q.failed_quantity}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeColor}`}>
                        {q.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{q.inspector_name}</td>
                    <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{q.notes || "-"}</td>
                    <td className="px-6 py-4 text-right text-slate-500 text-xs">
                      {dayjs(q.created_at * 1000).format("YYYY-MM-DD HH:mm")}
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
              <h3 className="text-lg font-bold text-white">Record Quality Inspection</h3>
              <button
                onClick={closeCreateModal}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateQualityCheck} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Work Order *
                </label>
                <select
                  required
                  value={selectedWorkOrderId}
                  onChange={(e) => {
                    setSelectedWorkOrderId(Number(e.target.value));
                    setSelectedProductId("");
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">-- Choose Work Order --</option>
                  {workOrders.map((wo) => (
                    <option key={wo.id} value={wo.id}>
                      {wo.order_number} ({wo.machine_name})
                    </option>
                  ))}
                </select>
              </div>

              {selectedWorkOrderId && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Select Product *
                  </label>
                  <select
                    required
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="">-- Choose Product --</option>
                    {workOrders.find(w => w.id === selectedWorkOrderId)?.products.map((p) => (
                      <option key={p.product_id} value={p.product_id}>
                        {p.product_name} ({p.product_sku})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Inspected Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={inspectedQuantity}
                  onChange={(e) => onInspectedQuantityChange(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 50"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Passed Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={passedQuantity}
                    onChange={(e) => onPassedQuantityChange(e.target.value === "" ? "" : Number(e.target.value), inspectedQuantity)}
                    placeholder="e.g. 48"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Failed Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    readOnly
                    value={failedQuantity}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-500 focus:outline-none cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Inspection Note / Defect details
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Minor scratches on surface, otherwise OK"
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
                  {loading ? "Recording..." : "Save QA Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});
