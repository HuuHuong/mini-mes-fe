import { useCallback, useEffect, useState } from "react";
import { useRedux, useEventCallback } from "@common";
import { dashboardActions } from "@redux/redux-action";
import { IDashboardSummaryResponse } from "@types";

export const useFunctions = () => {
  const { dispatch } = useRedux();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<IDashboardSummaryResponse | null>(null);

  const fetchDashboardData = useEventCallback(() => {
    setLoading(true);
    dispatch(
      dashboardActions.getSummary({
        onSuccess: (data) => {
          setSummary(data);
          setLoading(false);
        },
        onError: (error) => {
          console.error("Failed to fetch dashboard summary", error);
          setLoading(false);
        },
      })
    );
  });

  useEffect(() => {
    fetchDashboardData();
    // Auto-refresh every 10 seconds for real-time dashboard updates
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  return {
    loading,
    summary,
    refresh: fetchDashboardData,
  };
};
