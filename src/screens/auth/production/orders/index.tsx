import { memo } from "react";
import dayjs from "dayjs";
import { useFunctions } from "./useFunctions";

export const ProductionOrdersScreen = memo(() => {
  const {
    loading,
    workOrders,
    products,
    machines,
    isCreateModalOpen,
    isOutputModalOpen,
    isDetailsModalOpen,
    selectedProductId,
    selectedMachineId,
    targetQuantity,
    plannedStart,
    plannedEnd,
    notes,
    outputQuantity,
    defectQuantity,
    selectedWorkOrderDetail,
    openCreateModal,
    closeCreateModal,
    openOutputModal,
    closeOutputModal,
    closeDetailsModal,
    openDetailsModal,
    handleCreateWorkOrder,
    handleRecordOutput,
    updateOrderStatus,
    addedProducts,
    selectedOutputProductId,
    onChangeMachine,
    onChangeProduct,
    onChangeTargetQuantity,
    onChangePlannedStart,
    onChangePlannedEnd,
    onChangeNotes,
    onChangeOutputProduct,
    onChangeOutputQuantity,
    onChangeDefectQuantity,
    handleAddProduct,
    handleRemoveProduct,
    outputProducts,
    currentWorkOrderId,
  } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">Work Orders</h1>
          <p className="text-sm text-slate-400 mt-1">Dispatch, run, and monitor shop-floor manufacturing orders and logs.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
        >
          + Create Work Order
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Order No.</th>
              <th className="px-6 py-4">Products / SKUs</th>
              <th className="px-6 py-4">Machine</th>
              <th className="px-6 py-4">Quantity Progress</th>
              <th className="px-6 py-4">Defects</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
            {workOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-slate-500">
                  {loading ? "Loading work orders..." : "No work orders created."}
                </td>
              </tr>
            ) : (
              workOrders.map((wo) => {
                let statusBadge = "bg-slate-500/10 text-slate-400 border border-slate-500/20";
                if (wo.status === "Pending") statusBadge = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
                else if (wo.status === "InProgress") statusBadge = "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20";
                else if (wo.status === "Completed") statusBadge = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
                else if (wo.status === "Cancelled") statusBadge = "bg-rose-500/10 text-rose-400 border border-rose-500/20";

                return (
                  <tr key={wo.id} className="hover:bg-slate-900/30 transition-all">
                    <td className="px-6 py-4 font-mono font-bold text-white align-top">{wo.order_number}</td>
                    <td className="px-6 py-4 align-top">
                      <div className="space-y-1">
                        {wo.products.map((p) => (
                          <div key={p.product_id} className="text-slate-200">
                            <span className="font-semibold">{p.product_name}</span>{" "}
                            <span className="text-xs text-slate-500">({p.product_sku})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 align-top">{wo.machine_name}</td>
                    <td className="px-6 py-4 align-top space-y-2">
                      {wo.products.map((p) => {
                        const percent = p.target_quantity > 0 ? (p.produced_quantity / p.target_quantity) * 100 : 0;
                        return (
                          <div key={p.product_id} className="flex items-center gap-3">
                            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-indigo-500 h-2 rounded-full"
                                style={{ width: `${Math.min(percent, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 font-medium">
                              {p.produced_quantity} / {p.target_quantity} ({percent.toFixed(0)}%)
                            </span>
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-6 py-4 text-rose-400 font-semibold align-top">
                      {wo.products.reduce((sum, p) => sum + p.defect_quantity, 0)}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadge}`}>
                        {wo.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap align-top">
                      {wo.status === "Pending" && (
                        <button
                          onClick={() => updateOrderStatus(wo.id, 1)} // InProgress
                          className="text-xs bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg cursor-pointer font-semibold"
                        >
                          Start
                        </button>
                      )}
                      {wo.status === "InProgress" && (
                        <>
                          <button
                            onClick={() => openOutputModal(wo.id)}
                            className="text-xs bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-2.5 py-1.5 rounded-lg cursor-pointer font-semibold"
                          >
                            + Output
                          </button>
                          <button
                            onClick={() => updateOrderStatus(wo.id, 3)} // Completed
                            className="text-xs bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg cursor-pointer font-semibold"
                          >
                            Complete
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => openDetailsModal(wo.id)}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg cursor-pointer font-semibold"
                      >
                        Logs
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Creation Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create Work Order</h3>
              <button onClick={closeCreateModal} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleCreateWorkOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Assign Machine *</label>
                <select
                  required
                  value={selectedMachineId}
                  onChange={onChangeMachine}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">-- Choose Machine --</option>
                  {machines.map((m) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.code})</option>
                  ))}
                </select>
              </div>

              {/* Add Product Block */}
              <div className="border border-slate-800 p-4 rounded-xl space-y-3 bg-slate-950/40">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Add Products</div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Select Product</label>
                    <select
                      value={selectedProductId}
                      onChange={onChangeProduct}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="">-- Choose Product --</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Target Quantity</label>
                    <input
                      type="number"
                      value={targetQuantity}
                      onChange={onChangeTargetQuantity}
                      placeholder="e.g. 500"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-400 border border-indigo-500/20 py-2 rounded-lg cursor-pointer transition-all"
                >
                  + Add to Order
                </button>

                {/* List of added products */}
                {addedProducts.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-850">
                    <div className="text-[10px] font-bold text-slate-500 uppercase">Selected Products ({addedProducts.length})</div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {addedProducts.map((ap, index) => (
                        <div key={`${ap.product_id}-${index}`} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-850 text-xs">
                          <span className="text-slate-300 font-semibold">{ap.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-medium">Qty: {ap.target_quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProduct(index)}
                              className="text-rose-500 hover:text-rose-400 font-bold cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Planned Start</label>
                  <input
                    type="datetime-local"
                    value={plannedStart}
                    onChange={onChangePlannedStart}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Planned End</label>
                  <input
                    type="datetime-local"
                    value={plannedEnd}
                    onChange={onChangePlannedEnd}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={onChangeNotes}
                  placeholder="Order requirements, packaging specs..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={closeCreateModal} className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white cursor-pointer">Cancel</button>
                <button type="submit" disabled={loading} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer">
                  {loading ? "Creating..." : "Save Work Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Output Modal */}
      {isOutputModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Record Production Output</h3>
              <button onClick={closeOutputModal} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleRecordOutput} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Product *</label>
                <select
                  required
                  value={selectedOutputProductId}
                  onChange={onChangeOutputProduct}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="">-- Choose Product --</option>
                  {outputProducts.map((p) => (
                    <option key={p.product_id} value={p.product_id}>{p.product_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Produced Quantity (Good units)</label>
                <input
                  type="number"
                  required
                  value={outputQuantity}
                  onChange={onChangeOutputQuantity}
                  placeholder="e.g. 50"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Defect Quantity</label>
                <input
                  type="number"
                  required
                  value={defectQuantity}
                  onChange={onChangeDefectQuantity}
                  placeholder="e.g. 2"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={closeOutputModal} className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white cursor-pointer">Cancel</button>
                <button type="submit" disabled={loading} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer">
                  {loading ? "Recording..." : "Record Output"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details & Logs Modal */}
      {isDetailsModalOpen && selectedWorkOrderDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Order Details: {selectedWorkOrderDetail.order_number}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Created by {selectedWorkOrderDetail.created_by} on {dayjs(selectedWorkOrderDetail.created_at * 1000).format("YYYY-MM-DD")}</p>
              </div>
              <button onClick={closeDetailsModal} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
            </div>

            {/* Info Summary Grid */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-xs grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block mb-1">Machine Code</span>
                <span className="text-slate-200 font-semibold font-mono">{selectedWorkOrderDetail.machine_code}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Machine Name</span>
                <span className="text-slate-200 font-semibold">{selectedWorkOrderDetail.machine_name}</span>
              </div>
            </div>

            {/* Products Progress Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Products Progress</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedWorkOrderDetail.products.map((p) => {
                  return (
                    <div key={p.product_id} className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-200 font-bold">{p.product_name}</span>
                        <span className="text-slate-400 font-mono font-medium">{p.product_sku}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Produced: <strong className="text-slate-200">{p.produced_quantity}</strong> / {p.target_quantity}</span>
                        <span>Defects: <strong className="text-rose-400">{p.defect_quantity}</strong></span>
                      </div>
                      <div className="flex justify-between items-center text-slate-500 text-[10px]">
                        <span>Yield Rate: <strong className="text-emerald-400">{p.yield_rate.toFixed(1)}%</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Logs Timeline */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Order Action Logs</h4>
              <div className="border-l border-slate-800 ml-3 pl-4 space-y-4">
                {selectedWorkOrderDetail.logs.length === 0 ? (
                  <p className="text-xs text-slate-500">No logs found for this order.</p>
                ) : (
                  selectedWorkOrderDetail.logs.map((log) => (
                    <div key={log.id} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-indigo-500" />
                      <div className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <p className="text-xs font-bold text-slate-200">{log.event_type} • <span className="text-slate-400 font-semibold">{log.user_name || "System"}</span></p>
                          <span className="text-[10px] text-slate-500">{dayjs(log.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                        </div>
                        <p className="text-xs text-slate-400">{log.message}</p>
                        {(log.old_value || log.new_value) && (
                          <div className="text-[10px] font-mono bg-slate-950 p-2 rounded border border-slate-850 mt-1 space-x-3">
                            <span className="text-rose-400">- {log.old_value || "None"}</span>
                            <span className="text-slate-500">→</span>
                            <span className="text-emerald-400">+ {log.new_value || "None"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button onClick={closeDetailsModal} className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
