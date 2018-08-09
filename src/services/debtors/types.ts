import { IConvertedAmount, IMoney } from 'utils/money/types';

interface IDebtor {
  id: number;
  name: string;
  amounts: IConvertedAmount[];
}

interface ITotalByCurrency {
  name: string;
  amount: IMoney;
}

export { IDebtor, ITotalByCurrency };
