import { AUTH_ACTIONS } from "@redux/redux-type";
import { createAction } from "@reduxjs/toolkit";

const login = createAction(
  AUTH_ACTIONS.LOGIN,
  (params: {
    body: { email: string; password: string };
    onSuccess: (data: any) => void;
    onError?: (e: any) => void;
  }) => ({
    payload: params,
  }),
);

export const authActions = {
  login,
};
