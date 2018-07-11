import { Money } from 'utils/money';

export interface Debtor {
  id: number;
  name: string;
  amount: {
    amount?: Money;
    oldAmount: Money;
    updatedAt?: string;
    rate: number;
    total: Money;
  };
}
