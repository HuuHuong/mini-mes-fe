import { memo, useCallback } from "react";
import { IProductResponse } from "@types";

interface Props {
  product: IProductResponse;
  onOpenBom: (product: IProductResponse) => void;
  onToggleActive: (product: IProductResponse) => void;
}

export const ProductRow = memo(({ product, onOpenBom, onToggleActive }: Props) => {
  const handleOpenBom = useCallback(() => {
    onOpenBom(product);
  }, [onOpenBom, product]);

  const handleToggleActive = useCallback(() => {
    onToggleActive(product);
  }, [onToggleActive, product]);

  return (
    <tr className="hover:bg-slate-900/30 transition-all">
      <td className="px-6 py-4 font-semibold text-white">{product.name}</td>
      <td className="px-6 py-4">
        <span className="font-mono bg-slate-800 text-indigo-300 px-2.5 py-1 rounded text-xs">
          {product.sku}
        </span>
      </td>
      <td className="px-6 py-4">{product.unit}</td>
      <td className="px-6 py-4 text-slate-400 max-w-xs truncate">{product.description || "-"}</td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            product.is_active
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${product.is_active ? "bg-emerald-400" : "bg-rose-400"}`} />
          {product.is_active ? "Active" : "Inactive"}
        </span>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <button
          onClick={handleOpenBom}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 transition-all cursor-pointer mr-2"
        >
          BOM
        </button>
        <button
          onClick={handleToggleActive}
          className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            product.is_active
              ? "border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
              : "border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10"
          }`}
        >
          {product.is_active ? "Deactivate" : "Activate"}
        </button>
      </td>
    </tr>
  );
});
