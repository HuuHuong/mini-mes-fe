import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@common/hooks";
import { appActions } from "@redux/redux-slice";

interface SidebarItem {
  name: string;
  path: string;
}

interface SidebarCategory {
  title: string;
  icon: string;
  items: SidebarItem[];
}

const SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    title: "Overview",
    icon: "📈",
    items: [
      { name: "Dashboard", path: "/analytics/oee" },
    ],
  },
  {
    title: "Production",
    icon: "📋",
    items: [
      { name: "Products", path: "/production/products" },
      { name: "Work Orders", path: "/production/orders" },
    ],
  },
  {
    title: "Machines",
    icon: "🏭",
    items: [
      { name: "Machine List", path: "/machines/list" },
      { name: "Monitoring", path: "/machines/monitoring" },
    ],
  },
  {
    title: "Inventory",
    icon: "📦",
    items: [
      { name: "Stock Status", path: "/inventory/stock" },
      { name: "Transactions", path: "/inventory/materials" },
    ],
  },
  {
    title: "Quality",
    icon: "🔍",
    items: [
      { name: "Inspections", path: "/quality/inspections" },
    ],
  },
];

export const useFunctions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.app.themeMode);

  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const categories = SIDEBAR_CATEGORIES;

  const toggleCategory = useCallback((categoryTitle: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  }, []);

  const onLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  const onToggleTheme = useCallback(() => {
    dispatch(appActions.toggleThemeMode());
  }, [dispatch]);

  return {
    categories,
    themeMode,
    collapsedCategories,
    toggleCategory,
    onLogout,
    onToggleTheme,
  };
};
