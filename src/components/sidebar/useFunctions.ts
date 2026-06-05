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
    title: "Production",
    icon: "📋",
    items: [
      { name: "Orders", path: "/production/orders" },
      { name: "Schedule", path: "/production/schedule" },
      { name: "Tracking", path: "/production/tracking" },
    ],
  },
  {
    title: "Machines",
    icon: "🏭",
    items: [
      { name: "Machine List", path: "/machines/list" },
      { name: "Monitoring", path: "/machines/monitoring" },
      { name: "Downtime", path: "/machines/downtime" },
    ],
  },
  {
    title: "Inventory",
    icon: "📦",
    items: [
      { name: "Materials", path: "/inventory/materials" },
      { name: "Stock", path: "/inventory/stock" },
    ],
  },
  {
    title: "Quality",
    icon: "🔍",
    items: [
      { name: "Inspections", path: "/quality/inspections" },
      { name: "Defects", path: "/quality/defects" },
    ],
  },
  {
    title: "Employees",
    icon: "👷",
    items: [
      { name: "Operators", path: "/employees/operators" },
      { name: "Shifts", path: "/employees/shifts" },
    ],
  },
  {
    title: "Analytics",
    icon: "📈",
    items: [
      { name: "OEE", path: "/analytics/oee" },
      { name: "KPIs", path: "/analytics/kpis" },
      { name: "Reports", path: "/analytics/reports" },
    ],
  },
  {
    title: "Administration",
    icon: "⚙️",
    items: [
      { name: "Users", path: "/administration/users" },
      { name: "Roles", path: "/administration/roles" },
      { name: "Settings", path: "/administration/settings" },
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
