import { memo, useCallback, FormEvent, ChangeEvent } from "react";
import { IProductResponse, IBomResponse, IBomItemResponse } from "@types";

interface BomItemRowProps {
  item: IBomItemResponse;
  onEdit: (item: IBomItemResponse) => void;
  onDelete: (id: number) => void;
}

const BomItemRow = memo(({ item, onEdit, onDelete }: BomItemRowProps) => {
  const handleEdit = useCallback(() => {
    onEdit(item);
  }, [onEdit, item]);

  const handleDelete = useCallback(() => {
    onDelete(item.id);
  }, [onDelete, item.id]);

  return (
    <tr className="hover:bg-slate-900/30 transition-all">
      <td className="px-4 py-3">
        <div className="font-semibold text-white">{item.material_name}</div>
        <div className="text-[10px] text-slate-500 font-mono">{item.material_sku}</div>
      </td>
      <td className="px-4 py-3 font-semibold text-indigo-300">
        {item.quantity} {item.unit}
      </td>
      <td className="px-4 py-3 text-slate-400 font-mono">{item.sort_order}</td>
      <td className="px-4 py-3 text-slate-400 max-w-[120px] truncate" title={item.notes || ""}>
        {item.notes || "-"}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
            item.is_active
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {item.is_active ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
        <button
          onClick={handleEdit}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-750 px-2 py-1 rounded cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-2 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
});

interface Props {
  isOpen: boolean;
  product: IProductResponse;
  bomData: IBomResponse | null;
  allMaterials: IProductResponse[];
  bomLoading: boolean;
  editingItemId: number | null;
  materialId: number | "";
  quantity: number | "";
  unit: string;
  notes: string;
  sortOrder: number;
  isActive: boolean;
  onClose: () => void;
  onEditItem: (item: IBomItemResponse) => void;
  onCancelEdit: () => void;
  onSubmit: (e: FormEvent) => void;
  onDeleteItem: (id: number) => void;
  onChangeMaterial: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeUnit: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeNotes: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeSortOrder: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeIsActive: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const BomModal = memo(({
  isOpen,
  product,
  bomData,
  allMaterials,
  bomLoading,
  editingItemId,
  materialId,
  quantity,
  unit,
  notes,
  sortOrder,
  isActive,
  onClose,
  onEditItem,
  onCancelEdit,
  onSubmit,
  onDeleteItem,
  onChangeMaterial,
  onChangeQuantity,
  onChangeUnit,
  onChangeNotes,
  onChangeSortOrder,
  onChangeIsActive,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">Bill of Materials (BOM)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage material requirements for <strong className="text-indigo-400">{product.name}</strong> ({product.sku})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add / Edit Form (1/3 Width) */}
          <div className="bg-slate-955 p-4 rounded-xl border border-slate-800 space-y-4 h-fit">
            <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              {editingItemId !== null ? "Edit BOM Item" : "Add BOM Item"}
            </h4>
            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Select Material *
                </label>
                <select
                  required
                  value={materialId}
                  onChange={onChangeMaterial}
                  disabled={editingItemId !== null}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer disabled:opacity-50"
                >
                  <option value="">-- Choose Material --</option>
                  {allMaterials
                    .filter((m) => m.id !== product.id)
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.sku})
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={quantity}
                    onChange={onChangeQuantity}
                    placeholder="e.g. 2.5"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={onChangeUnit}
                    placeholder="e.g. kg"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={onChangeSortOrder}
                  placeholder="0"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={onChangeNotes}
                  placeholder="Special handling, dimensions..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {editingItemId !== null && (
                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="bomIsActive"
                    checked={isActive}
                    onChange={onChangeIsActive}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="bomIsActive" className="text-xs font-semibold text-slate-300 cursor-pointer">
                    Is Active
                  </label>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {editingItemId !== null && (
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2 rounded-lg cursor-pointer transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={bomLoading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 rounded-lg cursor-pointer transition-all disabled:opacity-50"
                >
                  {editingItemId !== null ? "Save" : "Add Item"}
                </button>
              </div>
            </form>
          </div>

          {/* Items List (2/3 Width) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/20 max-h-[50vh] overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Sort</th>
                    <th className="px-4 py-3">Notes</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850 text-xs text-slate-300">
                  {bomLoading && (!bomData || bomData.items.length === 0) ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        Loading BOM items...
                      </td>
                    </tr>
                  ) : !bomData || bomData.items.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                        No materials configured in this BOM yet.
                      </td>
                    </tr>
                  ) : (
                    bomData.items.map((item) => (
                      <BomItemRow
                        key={item.id}
                        item={item}
                        onEdit={onEditItem}
                        onDelete={onDeleteItem}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
});
