export enum CategoryType {
  Income  = 'Income',
  Expense = 'Expense',
}

export interface ICategory {
  id:       number;
  name:     string;
  type:     CategoryType;
}

export interface ICategoryParams {
  name?: string | null;
  type?: string | null;
}
