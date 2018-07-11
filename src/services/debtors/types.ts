import { ConvertedAmount } from 'utils/money';

export interface Debtor {
  id: number;
  name: string;
  amount: ConvertedAmount;
}
