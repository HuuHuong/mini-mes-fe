import { memo } from "react";
import { useFunctions } from "./useFunctions";
import { ProductRow, BomModal } from "./components";

export const ProductionProductsScreen = memo(() => {
  const {
    loading,
    products,
    search,
    isModalOpen,
    name,
    sku,
    unit,
    description,
    setName,
    setSku,
    setUnit,
    setDescription,
    onSearchChange,
    openCreateModal,
    closeCreateModal,
    handleCreateProduct,
    toggleProductActive,

    // BOM Exports
    isBomModalOpen,
    selectedProductForBom,
    bomData,
    allMaterials,
    bomLoading,
    editingBomItemId,
    materialId,
    bomQuantity,
    bomUnit,
    bomNotes,
    bomSortOrder,
    bomIsActive,
    openBomModal,
    closeBomModal,
    handleEditBomItemClick,
    handleCancelEditBomItem,
    handleAddOrUpdateBomItem,
    handleDeleteBomItem,
    onChangeMaterialId,
    onChangeBomQuantity,
    onChangeBomUnit,
    onChangeBomNotes,
    onChangeBomSortOrder,
    onChangeBomIsActive,
  } = useFunctions();

  return (
    <div className="p-8 space-y-6">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-manrope">Products</h1>
          <p className="text-sm text-slate-400 mt-1">Manage definitions, SKUs, units, and active statuses of products.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
        >
          + Create Product
        </button>
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
              <th className="px-6 py-4">Unit</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850 text-sm text-slate-300">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                  {loading ? "Loading products..." : "No products found."}
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onOpenBom={openBomModal}
                  onToggleActive={toggleProductActive}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Create New Product</h3>
              <button
                onClick={closeCreateModal}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Premium Aluminium Sheet"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    SKU *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. ALU-PREM-001"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Unit of Measure *
                  </label>
                  <input
                    type="text"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="e.g. pcs, kg, meters"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Product notes, standard specs..."
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
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
                  {loading ? "Creating..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOM Management Modal */}
      {selectedProductForBom && (
        <BomModal
          isOpen={isBomModalOpen}
          product={selectedProductForBom}
          bomData={bomData}
          allMaterials={allMaterials}
          bomLoading={bomLoading}
          editingItemId={editingBomItemId}
          materialId={materialId}
          quantity={bomQuantity}
          unit={bomUnit}
          notes={bomNotes}
          sortOrder={bomSortOrder}
          isActive={bomIsActive}
          onClose={closeBomModal}
          onEditItem={handleEditBomItemClick}
          onCancelEdit={handleCancelEditBomItem}
          onSubmit={handleAddOrUpdateBomItem}
          onDeleteItem={handleDeleteBomItem}
          onChangeMaterial={onChangeMaterialId}
          onChangeQuantity={onChangeBomQuantity}
          onChangeUnit={onChangeBomUnit}
          onChangeNotes={onChangeBomNotes}
          onChangeSortOrder={onChangeBomSortOrder}
          onChangeIsActive={onChangeBomIsActive}
        />
      )}
    </div>
  );
});
