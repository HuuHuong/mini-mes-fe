import { takeLatestListeners } from "@common/redux";
import { ApiConstants } from "@networking/api";
import { apiClient } from "@networking/services";
import { authActions } from "@redux/redux-action";

// GET all todos
takeLatestListeners(true)({
  actionCreator: authActions.login,
  effect: async (action, _listenerApi) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.LOGIN, body);
      if (response) onSuccess(response.data);
    } catch (e) {
      onError?.(e);
    }
  },
});
