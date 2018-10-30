import { Status } from 'model-types';

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

export interface ICategoriesState {
  items:  ICategory[];
  status: Status;
  error:  Error | null;
}

export interface ICategoryState {
  data:   ICategory | null;
  status: Status;
  error:  Error | null;
}
