import { TODO_APP } from "@redux/redux-type";
import { createAction } from "@reduxjs/toolkit";
import type { CreateTodoDto, UpdateTodoDto } from "@types";

const getData = createAction(
  TODO_APP.GET_DATA,
  (params: { onSuccess: (data: any) => void; onError?: (e: any) => void }) => ({
    payload: params,
  }),
);

const createData = createAction(
  TODO_APP.CREATE_DATA,
  (params: {
    data: CreateTodoDto;
    onSuccess: (todo: any) => void;
    onError?: (e: any) => void;
  }) => ({
    payload: params,
  }),
);

const updateData = createAction(
  TODO_APP.UPDATE_DATA,
  (params: {
    id: number;
    data: UpdateTodoDto;
    onSuccess: (todo: any) => void;
    onError?: (e: any) => void;
  }) => ({
    payload: params,
  }),
);

const deleteData = createAction(
  TODO_APP.DELETE_DATA,
  (params: { id: number; onSuccess: () => void; onError?: (e: any) => void }) => ({
    payload: params,
  }),
);

export const todoActions = {
  getData,
  createData,
  updateData,
  deleteData,
};
