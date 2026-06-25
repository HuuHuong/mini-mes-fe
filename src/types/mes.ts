export interface IPaginatedRequest {
  page?: number;
  page_size?: number;
  search?: string;
  sort_by?: string;
  sort_direction?: "asc" | "desc";
}

export interface IPaginatedResponse<T> {
  items: T[];
  total_count: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

// Products
export interface ICreateProductRequest {
  name: string;
  sku: string;
  unit: string;
  description?: string;
}

export interface IUpdateProductRequest {
  name: string;
  sku: string;
  unit: string;
  description?: string;
  is_active: boolean;
}

export interface IProductResponse {
  id: number;
  name: string;
  sku: string;
  unit: string;
  description?: string;
  is_active: boolean;
  created_at: number;
  updated_at?: number;
}

export interface IProductDetailResponse {
  id: number;
  name: string;
  sku: string;
  unit: string;
  description?: string;
  is_active: boolean;
  current_stock: number;
  active_work_orders: number;
  created_at: number;
  updated_at?: number;
}

// Machines
export interface ICreateMachineRequest {
  name: string;
  code: string;
  location?: string;
}

export interface IUpdateMachineRequest {
  name: string;
  code: string;
  location?: string;
  is_active: boolean;
}

export type MachineStatus = "Idle" | "Running" | "Maintenance" | "Error";

export const MachineStatusEnum = {
  Idle: 0,
  Running: 1,
  Maintenance: 2,
  Error: 3,
} as const;

export interface IUpdateMachineStatusRequest {
  status: typeof MachineStatusEnum[keyof typeof MachineStatusEnum];
}

export interface IMachineResponse {
  id: number;
  name: string;
  code: string;
  location?: string;
  status: MachineStatus | string;
  is_active: boolean;
  created_at: number;
  updated_at?: number;
}

export interface IMachineDetailResponse {
  id: number;
  name: string;
  code: string;
  location?: string;
  status: MachineStatus | string;
  is_active: boolean;
  active_work_orders: number;
  created_at: number;
  updated_at?: number;
}

// Work Orders
export interface IWorkOrderProductRequest {
  product_id: number;
  target_quantity: number;
}

export interface ICreateWorkOrderRequest {
  products: IWorkOrderProductRequest[];
  machine_id: number;
  planned_start?: number;
  planned_end?: number;
  notes?: string;
}

export interface IUpdateWorkOrderRequest {
  products: IWorkOrderProductRequest[];
  machine_id: number;
  planned_start?: number;
  planned_end?: number;
  notes?: string;
}

export type WorkOrderStatus = "Pending" | "InProgress" | "Paused" | "Completed" | "Cancelled";

export const WorkOrderStatusEnum = {
  Pending: 0,
  InProgress: 1,
  Paused: 2,
  Completed: 3,
  Cancelled: 4,
} as const;

export interface IUpdateWorkOrderStatusRequest {
  status: typeof WorkOrderStatusEnum[keyof typeof WorkOrderStatusEnum];
}

export interface IRecordOutputRequest {
  product_id: number;
  quantity: number;
  defect_quantity: number;
}

export interface IWorkOrderProductResponse {
  product_id: number;
  product_name: string;
  product_sku: string;
  target_quantity: number;
  produced_quantity: number;
  defect_quantity: number;
  yield_rate: number;
}

export interface IWorkOrderResponse {
  id: number;
  order_number: string;
  products: IWorkOrderProductResponse[];
  machine_id: number;
  machine_name: string;
  status: WorkOrderStatus | string;
  planned_start?: number;
  planned_end?: number;
  actual_start?: number;
  actual_end?: number;
  notes?: string;
  created_by: string;
  created_at: number;
  updated_at?: number;
}

export interface IWorkOrderLogResponse {
  id: number;
  event_type: string;
  message: string;
  old_value?: string;
  new_value?: string;
  user_name?: string;
  created_at: number;
}

export interface IWorkOrderDetailResponse {
  id: number;
  order_number: string;
  products: IWorkOrderProductResponse[];
  machine_id: number;
  machine_name: string;
  machine_code: string;
  status: WorkOrderStatus | string;
  planned_start?: number;
  planned_end?: number;
  actual_start?: number;
  actual_end?: number;
  notes?: string;
  created_by: string;
  created_at: number;
  updated_at?: number;
  logs: IWorkOrderLogResponse[];
}

// Quality Checks
export type QualityCheckResult = "Pass" | "Fail" | "Pending";

export const QualityCheckResultEnum = {
  Pass: 0,
  Fail: 1,
  Pending: 2,
} as const;

export interface ICreateQualityCheckRequest {
  work_order_id: number;
  product_id: number;
  inspected_quantity: number;
  passed_quantity: number;
  failed_quantity: number;
  result: typeof QualityCheckResultEnum[keyof typeof QualityCheckResultEnum];
  notes?: string;
}

export interface IQualityCheckResponse {
  id: number;
  work_order_id: number;
  order_number: string;
  product_id: number;
  product_name: string;
  inspected_quantity: number;
  passed_quantity: number;
  failed_quantity: number;
  result: QualityCheckResult | string;
  notes?: string;
  inspector_name: string;
  created_at: number;
}

// Inventory
export type InventoryTransactionType = "Production" | "Adjustment" | "Shipment" | "Return";

export const InventoryTransactionTypeEnum = {
  Production: 0,
  Adjustment: 1,
  Shipment: 2,
  Return: 3,
} as const;

export interface ICreateInventoryTransactionRequest {
  product_id: number;
  type: typeof InventoryTransactionTypeEnum[keyof typeof InventoryTransactionTypeEnum];
  quantity: number;
  work_order_id?: number;
  reference?: string;
}

export interface IInventoryStockResponse {
  product_id: number;
  product_name: string;
  product_sku: string;
  unit: string;
  current_stock: number;
}

export interface IInventoryTransactionResponse {
  id: number;
  product_id: number;
  product_name: string;
  type: string;
  quantity: number;
  work_order_id?: number;
  order_number?: string;
  reference?: string;
  user_name: string;
  created_at: number;
}

// Dashboard
export interface IMachineStatusSummary {
  id: number;
  name: string;
  code: string;
  status: string;
  current_work_order?: string;
}

export interface IRecentWorkOrderResponse {
  id: number;
  order_number: string;
  product_name: string;
  machine_name: string;
  status: string;
  target_quantity: number;
  produced_quantity: number;
  created_at: number;
}

export interface IDashboardSummaryResponse {
  total_products: number;
  total_machines: number;
  machines_running: number;
  machines_idle: number;
  machines_maintenance: number;
  machines_error: number;
  total_work_orders: number;
  work_orders_pending: number;
  work_orders_in_progress: number;
  work_orders_completed_today: number;
  today_output: number;
  today_defects: number;
  today_yield_rate: number;
  recent_work_orders: IRecentWorkOrderResponse[];
  machine_statuses: IMachineStatusSummary[];
}

// BOM (Bill of Materials)
export interface ICreateBomItemRequest {
  material_id: number;
  quantity: number;
  unit: string;
  notes?: string;
  sort_order: number;
}

export interface IUpdateBomItemRequest {
  material_id: number;
  quantity: number;
  unit: string;
  notes?: string;
  sort_order: number;
  is_active: boolean;
}

export interface ISetBomRequest {
  items: ICreateBomItemRequest[];
}

export interface IBomItemResponse {
  id: number;
  product_id: number;
  product_name: string;
  material_id: number;
  material_name: string;
  material_sku: string;
  quantity: number;
  unit: string;
  notes?: string;
  sort_order: number;
  is_active: boolean;
  created_at: number;
  updated_at?: number;
}

export interface IBomResponse {
  product_id: number;
  product_name: string;
  product_sku: string;
  total_items: number;
  items: IBomItemResponse[];
}
