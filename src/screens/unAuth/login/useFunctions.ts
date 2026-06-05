import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFunctions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onLogin = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Store dummy token for testing auth flow
      localStorage.setItem("token", "mock-session-token");

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return {
    loading,
    onLogin,
  };
};
