import { useEffect, useState, ChangeEvent } from "react";
import { useRedux, useEventCallback } from "@common";
import { productActions, bomActions } from "@redux/redux-action";
import {
  IProductResponse,
  ICreateProductRequest,
  IBomResponse,
  IBomItemResponse,
  ICreateBomItemRequest,
  IUpdateBomItemRequest,
} from "@types";

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  // BOM States
  const [isBomModalOpen, setIsBomModalOpen] = useState(false);
  const [selectedProductForBom, setSelectedProductForBom] = useState<IProductResponse | null>(null);
  const [bomData, setBomData] = useState<IBomResponse | null>(null);
  const [allMaterials, setAllMaterials] = useState<IProductResponse[]>([]);
  const [bomLoading, setBomLoading] = useState(false);

  // BOM Form States
  const [editingBomItemId, setEditingBomItemId] = useState<number | null>(null);
  const [materialId, setMaterialId] = useState<number | "">("");
  const [bomQuantity, setBomQuantity] = useState<number | "">("");
  const [bomUnit, setBomUnit] = useState("pcs");
  const [bomNotes, setBomNotes] = useState("");
  const [bomSortOrder, setBomSortOrder] = useState(0);
  const [bomIsActive, setBomIsActive] = useState(true);

  const fetchProducts = useEventCallback(() => {
    setLoading(true);
    dispatch(
      productActions.getAll({
        body: {
          page,
          page_size: pageSize,
          search: search || undefined,
        },
        onSuccess: (response) => {
          setProducts(response.items);
          setTotalCount(response.total_count);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch products", error);
          setLoading(false);
        },
      }),
    );
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSearchChange = useEventCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
  );

  const openCreateModal = useEventCallback(() => {
    setName("");
    setSku("");
    setUnit("pcs");
    setDescription("");
    setIsModalOpen(true);
  });

  const closeCreateModal = useEventCallback(() => {
    setIsModalOpen(false);
  });

  const handleCreateProduct = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !sku || !unit) {
      alert("Please fill in name, sku, and unit.");
      return;
    }
    setLoading(true);
    const req: ICreateProductRequest = {
      name,
      sku,
      unit,
      description: description || undefined,
    };
    dispatch(
      productActions.create({
        body: req,
        onSuccess: () => {
          setIsModalOpen(false);
          fetchProducts();
        },
        onError: (error: any) => {
          alert(error.message || "Failed to create product");
          setLoading(false);
        },
      }),
    );
  });

  const toggleProductActive = useEventCallback((product: IProductResponse) => {
    setLoading(true);
    dispatch(
      productActions.update({
        id: product.id,
        body: {
          name: product.name,
          sku: product.sku,
          unit: product.unit,
          description: product.description,
          is_active: !product.is_active,
        },
        onSuccess: () => {
          fetchProducts();
        },
        onError: (error: any) => {
          alert(error.message || "Failed to update product status");
          setLoading(false);
        },
      }),
    );
  });

  const fetchBom = useEventCallback((productId: number) => {
    setBomLoading(true);
    dispatch(
      bomActions.get({
        productId,
        onSuccess: (data) => {
          setBomData(data);
          setBomLoading(false);
        },
        onError: (err) => {
          console.error("Failed to fetch BOM", err);
          setBomLoading(false);
        },
      }),
    );
  });

  const fetchMaterials = useEventCallback(() => {
    dispatch(
      productActions.getAll({
        body: { page_size: 100 },
        onSuccess: (res) => {
          setAllMaterials(res.items.filter((p) => p.is_active));
        },
        onError: (err) => {
          console.error("Failed to fetch materials", err);
        },
      }),
    );
  });

  const openBomModal = useEventCallback((product: IProductResponse) => {
    setSelectedProductForBom(product);
    setEditingBomItemId(null);
    setMaterialId("");
    setBomQuantity("");
    setBomUnit(product.unit || "pcs");
    setBomNotes("");
    setBomSortOrder(0);
    setBomIsActive(true);
    setIsBomModalOpen(true);
    fetchBom(product.id);
    fetchMaterials();
  });

  const closeBomModal = useEventCallback(() => {
    setIsBomModalOpen(false);
    setSelectedProductForBom(null);
    setBomData(null);
  });

  const handleEditBomItemClick = useEventCallback((item: IBomItemResponse) => {
    setEditingBomItemId(item.id);
    setMaterialId(item.material_id);
    setBomQuantity(item.quantity);
    setBomUnit(item.unit);
    setBomNotes(item.notes || "");
    setBomSortOrder(item.sort_order);
    setBomIsActive(item.is_active);
  });

  const handleCancelEditBomItem = useEventCallback(() => {
    setEditingBomItemId(null);
    setMaterialId("");
    setBomQuantity("");
    setBomUnit(selectedProductForBom?.unit || "pcs");
    setBomNotes("");
    setBomSortOrder(0);
    setBomIsActive(true);
  });

  const handleAddOrUpdateBomItem = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForBom || !materialId || bomQuantity === "") {
      alert("Please fill in material and quantity.");
      return;
    }

    setBomLoading(true);

    if (editingBomItemId !== null) {
      const req: IUpdateBomItemRequest = {
        material_id: Number(materialId),
        quantity: Number(bomQuantity),
        unit: bomUnit,
        notes: bomNotes || undefined,
        sort_order: Number(bomSortOrder),
        is_active: bomIsActive,
      };
      dispatch(
        bomActions.updateItem({
          productId: selectedProductForBom.id,
          id: editingBomItemId,
          body: req,
          onSuccess: () => {
            handleCancelEditBomItem();
            fetchBom(selectedProductForBom.id);
          },
          onError: (err: any) => {
            alert(err.message || "Failed to update BOM item");
            setBomLoading(false);
          },
        }),
      );
    } else {
      const req: ICreateBomItemRequest = {
        material_id: Number(materialId),
        quantity: Number(bomQuantity),
        unit: bomUnit,
        notes: bomNotes || undefined,
        sort_order: Number(bomSortOrder),
      };
      dispatch(
        bomActions.addItem({
          productId: selectedProductForBom.id,
          body: req,
          onSuccess: () => {
            handleCancelEditBomItem();
            fetchBom(selectedProductForBom.id);
          },
          onError: (err: any) => {
            alert(err.message || "Failed to add BOM item");
            setBomLoading(false);
          },
        }),
      );
    }
  });

  const handleDeleteBomItem = useEventCallback((id: number) => {
    if (!selectedProductForBom) return;
    if (!confirm("Are you sure you want to delete this BOM item?")) return;

    setBomLoading(true);
    dispatch(
      bomActions.deleteItem({
        productId: selectedProductForBom.id,
        id,
        onSuccess: () => {
          if (editingBomItemId === id) {
            handleCancelEditBomItem();
          }
          fetchBom(selectedProductForBom.id);
        },
        onError: (err: any) => {
          alert(err.message || "Failed to delete BOM item");
          setBomLoading(false);
        },
      }),
    );
  });

  const onChangeMaterialId = useEventCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value ? Number(e.target.value) : "";
    setMaterialId(val);
    if (val) {
      const mat = allMaterials.find((m) => m.id === val);
      if (mat) {
        setBomUnit(mat.unit);
      }
    }
  });

  const onChangeBomQuantity = useEventCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBomQuantity(e.target.value === "" ? "" : Number(e.target.value));
  });

  const onChangeBomUnit = useEventCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBomUnit(e.target.value);
  });

  const onChangeBomNotes = useEventCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBomNotes(e.target.value);
  });

  const onChangeBomSortOrder = useEventCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBomSortOrder(Number(e.target.value));
  });

  const onChangeBomIsActive = useEventCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBomIsActive(e.target.checked);
  });

  return {
    loading,
    products,
    search,
    page,
    pageSize,
    totalCount,
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
    refresh: fetchProducts,

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
  };
};
