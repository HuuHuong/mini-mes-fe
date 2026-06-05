import { takeLatestListeners } from "@common/redux";
import { ApiConstants } from "@networking/api";
import { apiClient } from "@networking/services";
import { todoActions } from "@redux/redux-action";

// GET all todos
takeLatestListeners(true)({
  actionCreator: todoActions.getData,
  effect: async (action, _listenerApi) => {
    const { onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.get(ApiConstants.DATA_TODO);
      if (response) onSuccess(response.data);
    } catch (e) {
      onError?.(e);
    }
  },
});

// CREATE todo
takeLatestListeners(true)({
  actionCreator: todoActions.createData,
  effect: async (action, _listenerApi) => {
    const { data, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.DATA_TODO, data);
      if (response) onSuccess(response.data);
    } catch (e) {
      onError?.(e);
    }
  },
});

// UPDATE todo
takeLatestListeners(true)({
  actionCreator: todoActions.updateData,
  effect: async (action, _listenerApi) => {
    const { id, data, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.put(
        `${ApiConstants.DATA_TODO}/${id}`,
        data,
      );
      if (response) onSuccess(response.data);
    } catch (e) {
      onError?.(e);
    }
  },
});

// DELETE todo
takeLatestListeners(true)({
  actionCreator: todoActions.deleteData,
  effect: async (action, _listenerApi) => {
    const { id, onSuccess, onError } = action.payload;
    try {
      await apiClient.delete(`${ApiConstants.DATA_TODO}/${id}`);
      onSuccess();
    } catch (e) {
      onError?.(e);
    }
  },
});
