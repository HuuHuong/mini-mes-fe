export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt?: string | null;
}

export interface CreateTodoDto {
  title: string;
  description?: string | null;
}

export interface UpdateTodoDto {
  title: string;
  description?: string | null;
  isCompleted: boolean;
}
