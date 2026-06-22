import { useEffect, useState } from "react";
import { useRedux, useEventCallback } from "@common";
import { inventoryActions } from "@redux/redux-action";
import { IInventoryStockResponse } from "@types";

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [stockItems, setStockItems] = useState<IInventoryStockResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchStock = useEventCallback(() => {
    setLoading(true);
    dispatch(
      inventoryActions.getStockSummary({
        body: {
          page,
          page_size: pageSize,
          search: search || undefined,
        },
        onSuccess: (response) => {
          setStockItems(response.items);
          setTotalCount(response.total_count);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch inventory stock summary", error);
          setLoading(false);
        },
      })
    );
  });

  useEffect(() => {
    fetchStock();
  }, [fetchStock]);

  const onSearchChange = useEventCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  }, []);

  return {
    loading,
    stockItems,
    search,
    page,
    pageSize,
    totalCount,
    setPage,
    onSearchChange,
    refresh: fetchStock,
  };
};
