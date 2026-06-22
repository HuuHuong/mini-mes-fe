import { memo } from "react";
import dayjs from "dayjs";
import { useFunctions } from "./useFunctions";

export const InventoryMaterialsScreen = memo(() => {
  const {
    loading,
    transactions,
    products,
    isModalOpen,
    selectedProductId,
    quantity,
    reference,
    setSelectedProductId,
    setQuantity,
    setReference,
    openCreateModal,
    closeCreateModal,
    handleCreateTransaction,
  } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">Stock Ledger</h1>
          <p className="text-sm text-slate-400 mt-1">Audit log of all material movements, production intakes, and manual adjustments.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
        >
          + Record Stock Adjustment
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Qty Delta</th>
              <th className="px-6 py-4">Ref/Order</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-500">
                  {loading ? "Loading stock transactions..." : "No transactions recorded."}
                </td>
              </tr>
            ) : (
              transactions.map((t) => {
                let badgeColor = "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                if (t.type === "Production") badgeColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                else if (t.type === "Adjustment") badgeColor = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                else if (t.type === "Shipment") badgeColor = "bg-rose-500/10 text-rose-400 border border-rose-500/20";

                const isNegative = t.quantity < 0;

                return (
                  <tr key={t.id} className="hover:bg-slate-900/30 transition-all">
                    <td className="px-6 py-4 font-mono text-slate-500">#{t.id}</td>
                    <td className="px-6 py-4 font-semibold text-white">{t.product_name}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${badgeColor}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-bold ${isNegative ? "text-rose-400" : "text-emerald-400"}`}>
                      {isNegative ? "" : "+"}
                      {t.quantity}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">
                      {t.order_number ? `Order: ${t.order_number}` : t.reference || "-"}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{t.user_name}</td>
                    <td className="px-6 py-4 text-right text-slate-500 text-xs">
                      {dayjs(t.created_at * 1000).format("YYYY-MM-DD HH:mm")}
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
              <h3 className="text-lg font-bold text-white">Log Manual Stock Adjustment</h3>
              <button
                onClick={closeCreateModal}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateTransaction} className="space-y-4">
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
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Adjustment Quantity * (use negative for deduction)
                </label>
                <input
                  type="number"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 100 or -50"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Reference Note / Reason
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. Damaged goods, manual audit, etc."
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
                  {loading ? "Recording..." : "Record Adjustment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
});
