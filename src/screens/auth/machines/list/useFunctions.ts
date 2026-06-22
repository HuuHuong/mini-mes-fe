import { useEffect, useState } from "react";
import { useRedux, useEventCallback } from "@common";
import { machineActions } from "@redux/redux-action";
import { IMachineResponse, ICreateMachineRequest } from "@types";

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [machines, setMachines] = useState<IMachineResponse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");

  const fetchMachines = useEventCallback(() => {
    setLoading(true);
    dispatch(
      machineActions.getAll({
        body: {
          page,
          page_size: pageSize,
          search: search || undefined,
        },
        onSuccess: (response) => {
          setMachines(response.items);
          setTotalCount(response.total_count);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch machines", error);
          setLoading(false);
        },
      }),
    );
  });

  useEffect(() => {
    fetchMachines();
  }, []);

  const onSearchChange = useEventCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
  );

  const openCreateModal = useEventCallback(() => {
    setName("");
    setCode("");
    setLocation("");
    setIsModalOpen(true);
  }, []);

  const closeCreateModal = useEventCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCreateMachine = useEventCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) {
      alert("Name and Code are required.");
      return;
    }
    setLoading(true);
    const req: ICreateMachineRequest = {
      name,
      code,
      location: location || undefined,
    };
    dispatch(
      machineActions.create({
        body: req,
        onSuccess: () => {
          setIsModalOpen(false);
          fetchMachines();
        },
        onError: (error: any) => {
          alert(error.message || "Failed to create machine");
          setLoading(false);
        },
      }),
    );
  });

  const handleStatusChange = useEventCallback(
    (id: number, statusStr: string) => {
      setLoading(true);
      let statusEnumVal = 0; // Idle
      if (statusStr === "Running") statusEnumVal = 1;
      else if (statusStr === "Maintenance") statusEnumVal = 2;
      else if (statusStr === "Error") statusEnumVal = 3;

      dispatch(
        machineActions.updateStatus({
          id,
          body: { status: statusEnumVal as any },
          onSuccess: () => {
            fetchMachines();
          },
          onError: (error: any) => {
            alert(error.message || "Failed to update machine status");
            setLoading(false);
          },
        }),
      );
    },
  );

  return {
    loading,
    machines,
    search,
    page,
    pageSize,
    totalCount,
    isModalOpen,
    name,
    code,
    location,
    setName,
    setCode,
    setLocation,
    onSearchChange,
    openCreateModal,
    closeCreateModal,
    handleCreateMachine,
    handleStatusChange,
    refresh: fetchMachines,
  };
};
