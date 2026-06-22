// const API_VERSION = '/api/v1/';

const ApiEndPoint = {
  LOGIN: "login",
  DASHBOARD_SUMMARY: "dashboard/summary",
  PRODUCTS: "products",
  MACHINES: "machines",
  WORK_ORDERS: "work-orders",
  QUALITY_CHECKS: "quality-checks",
  INVENTORY: "inventory",
  INVENTORY_TRANSACTIONS: "inventory/transactions",
} as const;

const configApi = () => {
  const apiOb: Record<string, string> = {};
  Object.keys(ApiEndPoint).forEach((x) => {
    const valueApi = ApiEndPoint[x as keyof typeof ApiEndPoint];
    apiOb[x] = valueApi;
  });
  return apiOb;
};

type ApiConstantsType<T> = {
  [a in keyof T]: string;
};

export const ApiConstants = configApi() as ApiConstantsType<typeof ApiEndPoint>;
