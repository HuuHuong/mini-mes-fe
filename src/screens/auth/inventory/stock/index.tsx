import { memo } from "react";
import { useFunctions } from "./useFunctions";

export const InventoryStockScreen = memo(() => {
  const {
    loading,
    stockItems,
    search,
    onSearchChange,
  } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">Stock Status</h1>
        <p className="text-sm text-slate-400 mt-1">Real-time inventory levels, product units, and available storage stock balances.</p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-slate-900/30 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={onSearchChange}
            placeholder="Search by SKU or name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/10 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Current Stock</th>
              <th className="px-6 py-4">Unit</th>
              <th className="px-6 py-4">Status Alert</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
            {stockItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                  {loading ? "Loading stock status..." : "No inventory stock recorded."}
                </td>
              </tr>
            ) : (
              stockItems.map((item) => {
                const isOutOfStock = item.current_stock <= 0;
                const isLowStock = item.current_stock > 0 && item.current_stock < 50;

                return (
                  <tr key={item.product_id} className="hover:bg-slate-900/30 transition-all">
                    <td className="px-6 py-4 font-semibold text-white">{item.product_name}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono bg-slate-800 text-indigo-300 px-2.5 py-1 rounded text-xs">
                        {item.product_sku}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-100">{item.current_stock}</td>
                    <td className="px-6 py-4 text-slate-400">{item.unit}</td>
                    <td className="px-6 py-4">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          Low Stock Alert
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});
