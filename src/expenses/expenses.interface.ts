export interface CreateExpenseDto {
  date: string;
  title: string;
  value: number;
  payment: string;
  user_id: number;
  category: string;
  description: string;
}

export interface UpdateExpenseDto {
  date?: string;
  title?: string;
  value?: number;
  payment?: string;
  category?: string;
  description?: string;
}

export interface FindAllExpensesDto {
  skip?: number;
  take?: number;
  user_id: number;
}