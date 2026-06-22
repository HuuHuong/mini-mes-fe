import { dispatch, takeLatestListeners } from "@common/redux";
import { ApiConstants } from "@networking/api";
import { apiClient } from "@networking/services";
import { authActions } from "@redux/redux-action";
import { appActions } from "@redux/redux-slice";

// GET all todos
takeLatestListeners(true)({
  actionCreator: authActions.login,
  effect: async (action, listenerApi) => {
    const { body, onSuccess, onError } = action.payload;
    try {
      const response = await apiClient.post(ApiConstants.LOGIN, body);
      if (response) {
        onSuccess(response.data);
        listenerApi.dispatch(appActions.setToken(response.data?.access_token));
        localStorage.setItem("token", response.data?.access_token);
      }
    } catch (e) {
      onError?.(e);
    }
  },
});
