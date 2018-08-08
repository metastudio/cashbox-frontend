import { IConvertedAmount, IMoney } from 'utils/money/types';

export interface Debtor {
  id: number;
  name: string;
  amounts: IConvertedAmount[];
}

export interface TotalByCurrency {
  name: string;
  amount: IMoney;
}
