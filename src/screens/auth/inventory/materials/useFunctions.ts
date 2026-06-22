import { useEffect, useState } from "react";
import { useRedux, useEventCallback } from "@common";
import { inventoryActions, productActions } from "@redux/redux-action";
import { IInventoryTransactionResponse, IProductResponse, ICreateInventoryTransactionRequest } from "@types";

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<IInventoryTransactionResponse[]>([]);
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Modal states for manual transaction
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [reference, setReference] = useState("");

  const fetchTransactions = useEventCallback(() => {
    setLoading(true);
    dispatch(
      inventoryActions.getTransactions({
        body: {
          page,
          page_size: pageSize,
        },
        onSuccess: (response) => {
          setTransactions(response.items);
          setTotalCount(response.total_count);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch transactions", error);
          setLoading(false);
        },
      })
    );
  });

  const fetchProducts = useEventCallback(() => {
    dispatch(
      productActions.getAll({
        body: { page_size: 100 },
        onSuccess: (response) => {
          setProducts(response.items.filter((p) => p.is_active));
        },
        onError: (error) => {
          console.error("Failed to fetch products for transaction selection", error);
        },
      })
    );
  });

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, [fetchTransactions, fetchProducts]);

  const openCreateModal = useEventCallback(() => {
    setSelectedProductId("");
    setQuantity("");
    setReference("");
    setIsModalOpen(true);
  }, []);

  const closeCreateModal = useEventCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCreateTransaction = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !quantity) {
      alert("Please select a product and enter quantity.");
      return;
    }

    setLoading(true);
    const req: ICreateInventoryTransactionRequest = {
      product_id: Number(selectedProductId),
      type: 1, // Adjustment enum value
      quantity: Number(quantity),
      reference: reference || undefined,
    };

    dispatch(
      inventoryActions.createTransaction({
        body: req,
        onSuccess: () => {
          setIsModalOpen(false);
          fetchTransactions();
        },
        onError: (error: any) => {
          alert(error.message || "Failed to log transaction");
          setLoading(false);
        },
      })
    );
  });

  return {
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
    refresh: fetchTransactions,
  };
};
