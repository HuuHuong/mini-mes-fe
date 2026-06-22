import { useEffect, useState } from "react";
import { useRedux, useEventCallback } from "@common";
import { productActions } from "@redux/redux-action";
import { IProductResponse, ICreateProductRequest } from "@types";

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
      })
    );
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onSearchChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  const openCreateModal = useEventCallback(() => {
    setName("");
    setSku("");
    setUnit("pcs");
    setDescription("");
    setIsModalOpen(true);
  }, []);

  const closeCreateModal = useEventCallback(() => {
    setIsModalOpen(false);
  }, []);

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
      })
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
      })
    );
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
  };
};
