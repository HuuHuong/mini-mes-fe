import { createAction } from "@reduxjs/toolkit";
import {
  DASHBOARD_ACTIONS,
  PRODUCT_ACTIONS,
  MACHINE_ACTIONS,
  WORK_ORDER_ACTIONS,
  QUALITY_CHECK_ACTIONS,
  INVENTORY_ACTIONS,
  BOM_ACTIONS,
} from "@redux/redux-type";
import {
  IDashboardSummaryResponse,
  IPaginatedRequest,
  IPaginatedResponse,
  IProductResponse,
  IProductDetailResponse,
  ICreateProductRequest,
  IUpdateProductRequest,
  IMachineResponse,
  IMachineDetailResponse,
  ICreateMachineRequest,
  IUpdateMachineRequest,
  IUpdateMachineStatusRequest,
  IWorkOrderResponse,
  IWorkOrderDetailResponse,
  ICreateWorkOrderRequest,
  IUpdateWorkOrderRequest,
  IUpdateWorkOrderStatusRequest,
  IRecordOutputRequest,
  IQualityCheckResponse,
  ICreateQualityCheckRequest,
  IInventoryStockResponse,
  IInventoryTransactionResponse,
  ICreateInventoryTransactionRequest,
  ICreateBomItemRequest,
  IUpdateBomItemRequest,
  ISetBomRequest,
  IBomItemResponse,
  IBomResponse,
} from "@types";

// Dashboard
const getDashboardSummary = createAction(
  DASHBOARD_ACTIONS.GET_SUMMARY,
  (params: {
    onSuccess: (data: IDashboardSummaryResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

export const dashboardActions = {
  getSummary: getDashboardSummary,
};

// Products
const getProducts = createAction(
  PRODUCT_ACTIONS.GET_ALL,
  (params: {
    body?: IPaginatedRequest;
    onSuccess: (data: IPaginatedResponse<IProductResponse>) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const getProductById = createAction(
  PRODUCT_ACTIONS.GET_BY_ID,
  (params: {
    id: number;
    onSuccess: (data: IProductDetailResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const createProduct = createAction(
  PRODUCT_ACTIONS.CREATE,
  (params: {
    body: ICreateProductRequest;
    onSuccess: (data: IProductResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const updateProduct = createAction(
  PRODUCT_ACTIONS.UPDATE,
  (params: {
    id: number;
    body: IUpdateProductRequest;
    onSuccess: (data: IProductResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const deleteProduct = createAction(
  PRODUCT_ACTIONS.DELETE,
  (params: {
    id: number;
    onSuccess: (data: any) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

export const productActions = {
  getAll: getProducts,
  getById: getProductById,
  create: createProduct,
  update: updateProduct,
  delete: deleteProduct,
};

// Machines
const getMachines = createAction(
  MACHINE_ACTIONS.GET_ALL,
  (params: {
    body?: IPaginatedRequest & { status?: number };
    onSuccess: (data: IPaginatedResponse<IMachineResponse>) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const getMachineById = createAction(
  MACHINE_ACTIONS.GET_BY_ID,
  (params: {
    id: number;
    onSuccess: (data: IMachineDetailResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const createMachine = createAction(
  MACHINE_ACTIONS.CREATE,
  (params: {
    body: ICreateMachineRequest;
    onSuccess: (data: IMachineResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const updateMachine = createAction(
  MACHINE_ACTIONS.UPDATE,
  (params: {
    id: number;
    body: IUpdateMachineRequest;
    onSuccess: (data: IMachineResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const updateMachineStatus = createAction(
  MACHINE_ACTIONS.UPDATE_STATUS,
  (params: {
    id: number;
    body: IUpdateMachineStatusRequest;
    onSuccess: (data: IMachineResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

export const machineActions = {
  getAll: getMachines,
  getById: getMachineById,
  create: createMachine,
  update: updateMachine,
  updateStatus: updateMachineStatus,
};

// Work Orders
const getWorkOrders = createAction(
  WORK_ORDER_ACTIONS.GET_ALL,
  (params: {
    body?: IPaginatedRequest & { status?: number };
    onSuccess: (data: IPaginatedResponse<IWorkOrderResponse>) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const getWorkOrderById = createAction(
  WORK_ORDER_ACTIONS.GET_BY_ID,
  (params: {
    id: number;
    onSuccess: (data: IWorkOrderDetailResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const createWorkOrder = createAction(
  WORK_ORDER_ACTIONS.CREATE,
  (params: {
    body: ICreateWorkOrderRequest;
    onSuccess: (data: IWorkOrderResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const updateWorkOrder = createAction(
  WORK_ORDER_ACTIONS.UPDATE,
  (params: {
    id: number;
    body: IUpdateWorkOrderRequest;
    onSuccess: (data: IWorkOrderResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const updateWorkOrderStatus = createAction(
  WORK_ORDER_ACTIONS.UPDATE_STATUS,
  (params: {
    id: number;
    body: IUpdateWorkOrderStatusRequest;
    onSuccess: (data: IWorkOrderResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const recordWorkOrderOutput = createAction(
  WORK_ORDER_ACTIONS.RECORD_OUTPUT,
  (params: {
    id: number;
    body: IRecordOutputRequest;
    onSuccess: (data: IWorkOrderResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

export const workOrderActions = {
  getAll: getWorkOrders,
  getById: getWorkOrderById,
  create: createWorkOrder,
  update: updateWorkOrder,
  updateStatus: updateWorkOrderStatus,
  recordOutput: recordWorkOrderOutput,
};

// Quality Checks
const getQualityChecks = createAction(
  QUALITY_CHECK_ACTIONS.GET_ALL,
  (params: {
    body?: IPaginatedRequest & { work_order_id?: number; result?: number };
    onSuccess: (data: IPaginatedResponse<IQualityCheckResponse>) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const createQualityCheck = createAction(
  QUALITY_CHECK_ACTIONS.CREATE,
  (params: {
    body: ICreateQualityCheckRequest;
    onSuccess: (data: IQualityCheckResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

export const qualityCheckActions = {
  getAll: getQualityChecks,
  create: createQualityCheck,
};

// Inventory
const getStockSummary = createAction(
  INVENTORY_ACTIONS.GET_STOCK_SUMMARY,
  (params: {
    body?: IPaginatedRequest;
    onSuccess: (data: IPaginatedResponse<IInventoryStockResponse>) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const getTransactions = createAction(
  INVENTORY_ACTIONS.GET_TRANSACTIONS,
  (params: {
    body?: IPaginatedRequest & { product_id?: number };
    onSuccess: (
      data: IPaginatedResponse<IInventoryTransactionResponse>,
    ) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const createTransaction = createAction(
  INVENTORY_ACTIONS.CREATE_TRANSACTION,
  (params: {
    body: ICreateInventoryTransactionRequest;
    onSuccess: (data: IInventoryTransactionResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

export const inventoryActions = {
  getStockSummary,
  getTransactions,
  createTransaction,
};

// BOM
const getBom = createAction(
  BOM_ACTIONS.GET,
  (params: {
    productId: number;
    onSuccess: (data: IBomResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const addBomItem = createAction(
  BOM_ACTIONS.ADD_ITEM,
  (params: {
    productId: number;
    body: ICreateBomItemRequest;
    onSuccess: (data: IBomItemResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const updateBomItem = createAction(
  BOM_ACTIONS.UPDATE_ITEM,
  (params: {
    productId: number;
    id: number;
    body: IUpdateBomItemRequest;
    onSuccess: (data: IBomItemResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const deleteBomItem = createAction(
  BOM_ACTIONS.DELETE_ITEM,
  (params: {
    productId: number;
    id: number;
    onSuccess: () => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

const setBom = createAction(
  BOM_ACTIONS.SET,
  (params: {
    productId: number;
    body: ISetBomRequest;
    onSuccess: (data: IBomResponse) => void;
    onError?: (e: any) => void;
  }) => ({ payload: params }),
);

export const bomActions = {
  get: getBom,
  addItem: addBomItem,
  updateItem: updateBomItem,
  deleteItem: deleteBomItem,
  set: setBom,
};
