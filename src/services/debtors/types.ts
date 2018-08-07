import { ConvertedAmount, Money } from 'utils/money';

export interface Debtor {
  id: number;
  name: string;
  amounts: ConvertedAmount[];
}

export interface TotalByCurrency {
  name: string;
  amount: Money;
}
