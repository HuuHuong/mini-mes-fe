import { takeLatestListeners } from "@common/redux";
import { ApiConstants } from "@networking/api";
import { apiClient } from "@networking/services";
import {
  dashboardActions,
  productActions,
  machineActions,
  workOrderActions,
  qualityCheckActions,
  inventoryActions,
} from "@redux/redux-action";

// Dashboard
takeLatestListeners(true)({
  actionCreator: dashboardActions.getSummary,
  effect: async (action) => {
    const { onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.DASHBOARD_SUMMARY);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

// Products
takeLatestListeners(true)({
  actionCreator: productActions.getAll,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.PRODUCTS, { params: body });
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: productActions.getById,
  effect: async (action) => {
    const { id, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(`${ApiConstants.PRODUCTS}/${id}`);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: productActions.create,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.PRODUCTS, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: productActions.update,
  effect: async (action) => {
    const { id, body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.put(`${ApiConstants.PRODUCTS}/${id}`, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: productActions.delete,
  effect: async (action) => {
    const { id, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.delete(`${ApiConstants.PRODUCTS}/${id}`);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

// Machines
takeLatestListeners(true)({
  actionCreator: machineActions.getAll,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.MACHINES, { params: body });
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: machineActions.getById,
  effect: async (action) => {
    const { id, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(`${ApiConstants.MACHINES}/${id}`);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: machineActions.create,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.MACHINES, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: machineActions.update,
  effect: async (action) => {
    const { id, body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.put(`${ApiConstants.MACHINES}/${id}`, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: machineActions.updateStatus,
  effect: async (action) => {
    const { id, body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.patch(`${ApiConstants.MACHINES}/${id}/status`, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

// Work Orders
takeLatestListeners(true)({
  actionCreator: workOrderActions.getAll,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.WORK_ORDERS, { params: body });
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: workOrderActions.getById,
  effect: async (action) => {
    const { id, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(`${ApiConstants.WORK_ORDERS}/${id}`);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: workOrderActions.create,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.WORK_ORDERS, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: workOrderActions.update,
  effect: async (action) => {
    const { id, body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.put(`${ApiConstants.WORK_ORDERS}/${id}`, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: workOrderActions.updateStatus,
  effect: async (action) => {
    const { id, body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.patch(`${ApiConstants.WORK_ORDERS}/${id}/status`, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: workOrderActions.recordOutput,
  effect: async (action) => {
    const { id, body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(`${ApiConstants.WORK_ORDERS}/${id}/output`, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

// Quality Checks
takeLatestListeners(true)({
  actionCreator: qualityCheckActions.getAll,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.QUALITY_CHECKS, { params: body });
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: qualityCheckActions.create,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.QUALITY_CHECKS, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

// Inventory
takeLatestListeners(true)({
  actionCreator: inventoryActions.getStockSummary,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.INVENTORY, { params: body });
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: inventoryActions.getTransactions,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.INVENTORY_TRANSACTIONS, { params: body });
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});

takeLatestListeners(true)({
  actionCreator: inventoryActions.createTransaction,
  effect: async (action) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.INVENTORY_TRANSACTIONS, body);
      if (response) {
        onSuccess(response.data);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});
