import { memo } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Sidebar } from "@components";
import {
  LoginScreen,
  ProductionOrdersScreen,
  ProductionScheduleScreen,
  ProductionTrackingScreen,
  MachinesListScreen,
  MachinesMonitoringScreen,
  MachinesDowntimeScreen,
  InventoryMaterialsScreen,
  InventoryStockScreen,
  QualityInspectionsScreen,
  QualityDefectsScreen,
  EmployeesOperatorsScreen,
  EmployeesShiftsScreen,
  AnalyticsOeeScreen,
  AnalyticsKpisScreen,
  AnalyticsReportsScreen,
  AdministrationUsersScreen,
  AdministrationRolesScreen,
  AdministrationSettingsScreen,
  NotFoundScreen,
} from "@screens";

interface RouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = memo(({ children }: RouteProps) => {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
});

export const PublicRoute = memo(({ children }: RouteProps) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/analytics/oee" replace /> : <>{children}</>;
});

export const AuthLayout = memo(() => {
  return (
    <div className="auth-layout">
      <Sidebar />
      <div className="auth-layout-content">
        <Outlet />
      </div>
    </div>
  );
});

export const AppRouter = memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginScreen />
            </PublicRoute>
          }
        />

        {/* Protected Routes with Sidebar Layout */}
        <Route
          element={
            <ProtectedRoute>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          {/* Production */}
          <Route
            path="/production/orders"
            element={<ProductionOrdersScreen />}
          />
          <Route
            path="/production/schedule"
            element={<ProductionScheduleScreen />}
          />
          <Route
            path="/production/tracking"
            element={<ProductionTrackingScreen />}
          />

          {/* Machines */}
          <Route path="/machines/list" element={<MachinesListScreen />} />
          <Route
            path="/machines/monitoring"
            element={<MachinesMonitoringScreen />}
          />
          <Route
            path="/machines/downtime"
            element={<MachinesDowntimeScreen />}
          />

          {/* Inventory */}
          <Route
            path="/inventory/materials"
            element={<InventoryMaterialsScreen />}
          />
          <Route path="/inventory/stock" element={<InventoryStockScreen />} />

          {/* Quality */}
          <Route
            path="/quality/inspections"
            element={<QualityInspectionsScreen />}
          />
          <Route path="/quality/defects" element={<QualityDefectsScreen />} />

          {/* Employees */}
          <Route
            path="/employees/operators"
            element={<EmployeesOperatorsScreen />}
          />
          <Route path="/employees/shifts" element={<EmployeesShiftsScreen />} />

          {/* Analytics */}
          <Route path="/analytics/oee" element={<AnalyticsOeeScreen />} />
          <Route path="/analytics/kpis" element={<AnalyticsKpisScreen />} />
          <Route
            path="/analytics/reports"
            element={<AnalyticsReportsScreen />}
          />

          {/* Administration */}
          <Route
            path="/administration/users"
            element={<AdministrationUsersScreen />}
          />
          <Route
            path="/administration/roles"
            element={<AdministrationRolesScreen />}
          />
          <Route
            path="/administration/settings"
            element={<AdministrationSettingsScreen />}
          />

          {/* Fallback internal redirects */}
          <Route
            path="/dashboard"
            element={<Navigate to="/analytics/oee" replace />}
          />
          <Route path="/" element={<Navigate to="/analytics/oee" replace />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
});
