export enum CategoryType {
  Income  = 'Income',
  Expense = 'Expense',
}

export interface Category {
  id:       number;
  name:     string;
  type:     CategoryType;
}

export interface CategoryParams {
  name?: string | null;
  type?: string | null;
}
