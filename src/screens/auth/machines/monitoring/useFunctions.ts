import { useEffect, useState } from "react";
import { useRedux, useEventCallback } from "@common";
import { machineActions } from "@redux/redux-action";
import { IMachineResponse } from "@types";

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [machines, setMachines] = useState<IMachineResponse[]>([]);

  const fetchMachines = useEventCallback(() => {
    setLoading(true);
    dispatch(
      machineActions.getAll({
        onSuccess: (response) => {
          setMachines(response.items);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch machines for monitoring", error);
          setLoading(false);
        },
      })
    );
  });

  useEffect(() => {
    fetchMachines();
    const interval = setInterval(fetchMachines, 5000);
    return () => clearInterval(interval);
  }, [fetchMachines]);

  const updateMachineStatus = useEventCallback((id: number, statusStr: string) => {
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
      })
    );
  });

  return {
    loading,
    machines,
    updateMachineStatus,
    refresh: fetchMachines,
  };
};
