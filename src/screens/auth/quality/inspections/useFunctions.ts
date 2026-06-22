import { useEffect, useState } from "react";
import { useRedux, useEventCallback } from "@common";
import { qualityCheckActions, workOrderActions } from "@redux/redux-action";
import { IQualityCheckResponse, IWorkOrderResponse, ICreateQualityCheckRequest } from "@types";

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [qualityChecks, setQualityChecks] = useState<IQualityCheckResponse[]>([]);
  const [workOrders, setWorkOrders] = useState<IWorkOrderResponse[]>([]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<number | "">("");
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [inspectedQuantity, setInspectedQuantity] = useState<number | "">("");
  const [passedQuantity, setPassedQuantity] = useState<number | "">("");
  const [failedQuantity, setFailedQuantity] = useState<number | "">("");
  const [resultVal, setResultVal] = useState<0 | 1>(0); // 0 = Pass, 1 = Fail
  const [notes, setNotes] = useState("");

  const fetchQualityChecks = useEventCallback(() => {
    setLoading(true);
    dispatch(
      qualityCheckActions.getAll({
        onSuccess: (response) => {
          setQualityChecks(response.items);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch quality checks", error);
          setLoading(false);
        },
      })
    );
  });

  const fetchWorkOrders = useEventCallback(() => {
    dispatch(
      workOrderActions.getAll({
        body: { page_size: 100 },
        onSuccess: (response) => {
          setWorkOrders(response.items);
        },
        onError: (error) => {
          console.error("Failed to fetch work orders for inspection selection", error);
        },
      })
    );
  });

  useEffect(() => {
    fetchQualityChecks();
    fetchWorkOrders();
  }, [fetchQualityChecks, fetchWorkOrders]);

  const openCreateModal = useEventCallback(() => {
    setSelectedWorkOrderId("");
    setSelectedProductId("");
    setInspectedQuantity("");
    setPassedQuantity("");
    setFailedQuantity("");
    setResultVal(0);
    setNotes("");
    setIsModalOpen(true);
  }, []);

  const closeCreateModal = useEventCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCreateQualityCheck = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkOrderId || !selectedProductId || !inspectedQuantity || passedQuantity === "" || failedQuantity === "") {
      alert("Please fill in work order, product, inspected, passed, and failed quantities.");
      return;
    }

    setLoading(true);
    const req: ICreateQualityCheckRequest = {
      work_order_id: Number(selectedWorkOrderId),
      product_id: Number(selectedProductId),
      inspected_quantity: Number(inspectedQuantity),
      passed_quantity: Number(passedQuantity),
      failed_quantity: Number(failedQuantity),
      result: resultVal,
      notes: notes || undefined,
    };

    dispatch(
      qualityCheckActions.create({
        body: req,
        onSuccess: () => {
          setIsModalOpen(false);
          fetchQualityChecks();
        },
        onError: (error: any) => {
          alert(error.message || "Failed to save quality check");
          setLoading(false);
        },
      })
    );
  });

  // Sync passed + failed = inspected quantity, automatically calculated helper
  const onInspectedQuantityChange = useEventCallback((val: number | "") => {
    setInspectedQuantity(val);
    if (typeof val === "number") {
      setPassedQuantity(val);
      setFailedQuantity(0);
    } else {
      setPassedQuantity("");
      setFailedQuantity("");
    }
  }, []);

  const onPassedQuantityChange = useEventCallback((val: number | "", totalInspected: number | "") => {
    setPassedQuantity(val);
    if (typeof val === "number" && typeof totalInspected === "number") {
      const diff = totalInspected - val;
      setFailedQuantity(diff >= 0 ? diff : 0);
      setResultVal(diff > 0 ? 1 : 0); // If failed quantity > 0, set result to Fail
    }
  }, []);

  return {
    loading,
    qualityChecks,
    workOrders,
    isModalOpen,
    selectedWorkOrderId,
    selectedProductId,
    inspectedQuantity,
    passedQuantity,
    failedQuantity,
    resultVal,
    notes,
    setSelectedWorkOrderId,
    setSelectedProductId,
    setInspectedQuantity,
    setPassedQuantity,
    setFailedQuantity,
    setResultVal,
    setNotes,
    onInspectedQuantityChange,
    onPassedQuantityChange,
    openCreateModal,
    closeCreateModal,
    handleCreateQualityCheck,
  };
};
