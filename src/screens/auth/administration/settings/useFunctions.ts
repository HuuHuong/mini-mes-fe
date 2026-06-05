import { useCallback, useState } from "react";

export const useFunctions = () => {
  const [loading, setLoading] = useState(false);

  const onAction = useCallback(async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    onAction,
  };
};
