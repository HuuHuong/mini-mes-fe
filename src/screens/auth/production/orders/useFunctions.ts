import * as signalR from "@microsoft/signalr";
import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { useRedux, useEventCallback } from "@common";
import {
  workOrderActions,
  productActions,
  machineActions,
} from "@redux/redux-action";
import {
  IWorkOrderResponse,
  IProductResponse,
  IMachineResponse,
  IWorkOrderDetailResponse,
  ICreateWorkOrderRequest,
  IRecordOutputRequest,
} from "@types";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5130/mes-hub", {
    accessTokenFactory: () => localStorage.getItem("token") ?? "",
  })
  .withAutomaticReconnect()
  .build();

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [workOrders, setWorkOrders] = useState<IWorkOrderResponse[]>([]);
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [machines, setMachines] = useState<IMachineResponse[]>([]);

  // Modals Open State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Selected Order for output recording/detail view
  const [currentWorkOrderId, setCurrentWorkOrderId] = useState<number | null>(
    null,
  );
  const [selectedWorkOrderDetail, setSelectedWorkOrderDetail] =
    useState<IWorkOrderDetailResponse | null>(null);

  // Form Fields: Create Work Order
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [selectedMachineId, setSelectedMachineId] = useState<number | "">("");
  const [targetQuantity, setTargetQuantity] = useState<number | "">("");
  const [plannedStart, setPlannedStart] = useState("");
  const [plannedEnd, setPlannedEnd] = useState("");
  const [notes, setNotes] = useState("");

  // Array of products added to the work order
  const [addedProducts, setAddedProducts] = useState<
    {
      product_id: number;
      target_quantity: number;
      name: string;
    }[]
  >([]);

  // Form Fields: Record Output
  const [selectedOutputProductId, setSelectedOutputProductId] = useState<
    number | ""
  >("");
  const [outputQuantity, setOutputQuantity] = useState<number | "">("");
  const [defectQuantity, setDefectQuantity] = useState<number | "">("");

  const fetchWorkOrders = useEventCallback(() => {
    setLoading(true);
    dispatch(
      workOrderActions.getAll({
        onSuccess: (response) => {
          setWorkOrders(response.items);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch work orders", error);
          setLoading(false);
        },
      }),
    );
  });

  const fetchDependencies = useEventCallback(() => {
    dispatch(
      productActions.getAll({
        body: { page_size: 100 },
        onSuccess: (prodRes) => {
          setProducts(prodRes.items.filter((p) => p.is_active));
        },
        onError: (error) => {
          console.error("Failed to fetch products for work orders", error);
        },
      }),
    );

    dispatch(
      machineActions.getAll({
        body: { page_size: 100 },
        onSuccess: (machRes) => {
          setMachines(machRes.items.filter((m) => m.is_active));
        },
        onError: (error) => {
          console.error("Failed to fetch machines for work orders", error);
        },
      }),
    );
  });

  const fetchWorkOrderDetail = useEventCallback((id: number) => {
    dispatch(
      workOrderActions.getById({
        id,
        onSuccess: (detail) => {
          setSelectedWorkOrderDetail(detail);
        },
        onError: (error: any) => {
          console.error("Failed to refresh work order details", error);
        },
      }),
    );
  });

  const startConnection = useEventCallback(async () => {
    try {
      if (connection.state === signalR.HubConnectionState.Disconnected) {
        await connection.start();
        console.log("SignalR Connected.");
      }
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
    }
  });

  const onProductionOutputUpdated = useEventCallback((data: any) => {
    console.log("ProductionOutputUpdated:", data);
    fetchWorkOrders();
    if (isDetailsModalOpen && currentWorkOrderId !== null) {
      fetchWorkOrderDetail(currentWorkOrderId);
    }
  });

  const onWorkOrderStatusChanged = useEventCallback((data: any) => {
    console.log("WorkOrderStatusChanged:", data);
    fetchWorkOrders();
    if (isDetailsModalOpen && currentWorkOrderId !== null) {
      fetchWorkOrderDetail(currentWorkOrderId);
    }
  });

  useEffect(() => {
    startConnection();

    connection.on("ProductionOutputUpdated", onProductionOutputUpdated);
    connection.on("WorkOrderStatusChanged", onWorkOrderStatusChanged);

    return () => {
      connection.off("ProductionOutputUpdated", onProductionOutputUpdated);
      connection.off("WorkOrderStatusChanged", onWorkOrderStatusChanged);
    };
  }, [
    startConnection,
    onProductionOutputUpdated,
    onWorkOrderStatusChanged,
  ]);

  useEffect(() => {
    fetchWorkOrders();
    fetchDependencies();
  }, [fetchWorkOrders, fetchDependencies]);

  const openCreateModal = useEventCallback(() => {
    setSelectedProductId("");
    setSelectedMachineId("");
    setTargetQuantity("");
    setPlannedStart("");
    setPlannedEnd("");
    setNotes("");
    setAddedProducts([]);
    setIsCreateModalOpen(true);
  });

  const closeCreateModal = useEventCallback(() => {
    setIsCreateModalOpen(false);
  });

  const openOutputModal = useEventCallback((id: number) => {
    setCurrentWorkOrderId(id);
    setSelectedOutputProductId("");
    setOutputQuantity("");
    setDefectQuantity(0);
    setIsOutputModalOpen(true);
  });

  const closeOutputModal = useEventCallback(() => {
    setIsOutputModalOpen(false);
  });

  const openDetailsModal = useEventCallback((id: number) => {
    setLoading(true);
    dispatch(
      workOrderActions.getById({
        id,
        onSuccess: (detail) => {
          setSelectedWorkOrderDetail(detail);
          setIsDetailsModalOpen(true);
          setLoading(false);
        },
        onError: (error: any) => {
          alert(error.message || "Failed to fetch work order logs");
          setLoading(false);
        },
      }),
    );
  });

  const closeDetailsModal = useEventCallback(() => {
    setIsDetailsModalOpen(false);
    setSelectedWorkOrderDetail(null);
  });

  const handleCreateWorkOrder = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMachineId) {
      alert("Machine selection is required.");
      return;
    }

    console.log("addedProducts", addedProducts);

    if (addedProducts.length === 0) {
      alert("Please add at least one product with target quantity.");
      return;
    }

    setLoading(true);
    const req: ICreateWorkOrderRequest = {
      products: addedProducts.map((ap) => ({
        product_id: ap.product_id,
        target_quantity: ap.target_quantity,
      })),
      machine_id: Number(selectedMachineId),
      planned_start: plannedStart
        ? Math.floor(new Date(plannedStart).getTime() / 1000)
        : undefined,
      planned_end: plannedEnd
        ? Math.floor(new Date(plannedEnd).getTime() / 1000)
        : undefined,
      notes: notes || undefined,
    };

    dispatch(
      workOrderActions.create({
        body: req,
        onSuccess: () => {
          setIsCreateModalOpen(false);
          fetchWorkOrders();
        },
        onError: (error: any) => {
          alert(error.message || "Failed to create work order");
          setLoading(false);
        },
      }),
    );
  });

  const handleRecordOutput = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (
      !currentWorkOrderId ||
      !selectedOutputProductId ||
      outputQuantity === "" ||
      defectQuantity === ""
    ) {
      alert("Please specify product, output quantity, and defect quantity.");
      return;
    }

    setLoading(true);
    const body: IRecordOutputRequest = {
      product_id: Number(selectedOutputProductId),
      quantity: Number(outputQuantity),
      defect_quantity: Number(defectQuantity),
    };

    dispatch(
      workOrderActions.recordOutput({
        id: currentWorkOrderId,
        body,
        onSuccess: () => {
          setIsOutputModalOpen(false);
          fetchWorkOrders();
        },
        onError: (error: any) => {
          alert(error.message || "Failed to record production output");
          setLoading(false);
        },
      }),
    );
  });

  const updateOrderStatus = useEventCallback(
    (id: number, statusVal: number) => {
      setLoading(true);
      dispatch(
        workOrderActions.updateStatus({
          id,
          body: { status: statusVal as any },
          onSuccess: () => {
            fetchWorkOrders();
          },
          onError: (error: any) => {
            alert(error.message || "Failed to update order status");
            setLoading(false);
          },
        }),
      );
    },
  );

  // New onChange handlers
  const onChangeMachine = useEventCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedMachineId(e.target.value ? Number(e.target.value) : "");
    },
  );

  const onChangeProduct = useEventCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedProductId(e.target.value ? Number(e.target.value) : "");
    },
  );

  const onChangeTargetQuantity = useEventCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTargetQuantity(e.target.value === "" ? "" : Number(e.target.value));
    },
  );

  const onChangePlannedStart = useEventCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPlannedStart(e.target.value);
    },
  );

  const onChangePlannedEnd = useEventCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPlannedEnd(e.target.value);
    },
  );

  const onChangeNotes = useEventCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(e.target.value);
    },
  );

  const onChangeOutputProduct = useEventCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setSelectedOutputProductId(e.target.value ? Number(e.target.value) : "");
    },
  );

  const onChangeOutputQuantity = useEventCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setOutputQuantity(e.target.value === "" ? "" : Number(e.target.value));
    },
  );

  const onChangeDefectQuantity = useEventCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDefectQuantity(e.target.value === "" ? "" : Number(e.target.value));
    },
  );

  // Product Add/Remove handlers
  const handleAddProduct = useEventCallback(() => {
    if (!selectedProductId || !targetQuantity) {
      alert("Please select product and set target quantity first.");
      return;
    }
    if (
      addedProducts.some((ap) => ap.product_id === Number(selectedProductId))
    ) {
      alert("This product is already added.");
      return;
    }
    const productObj = products.find((p) => p.id === Number(selectedProductId));
    if (productObj) {
      setAddedProducts((prev) => [
        ...prev,
        {
          product_id: productObj.id,
          target_quantity: Number(targetQuantity),
          name: productObj.name,
        },
      ]);
      setSelectedProductId("");
      setTargetQuantity("");
    }
  });

  const handleRemoveProduct = useEventCallback((index: number) => {
    setAddedProducts((prev) => prev.filter((_, i) => i !== index));
  });

  // Selector for output modal products
  const outputProducts = useMemo(() => {
    if (currentWorkOrderId === null) return [];
    return (
      workOrders.find((wo) => wo.id === currentWorkOrderId)?.products || []
    );
  }, [workOrders, currentWorkOrderId]);

  return {
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
    openDetailsModal,
    closeDetailsModal,
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
  };
};
