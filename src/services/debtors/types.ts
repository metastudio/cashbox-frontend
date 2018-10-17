import { Status } from 'model-types';
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

interface IDebtorsState {
  items:            IDebtor[];
  total:            IMoney | null;
  totalsByCurrency: ITotalByCurrency[];
  status:           Status;
  error:            Error | null;
}

export {
  IDebtor,
  ITotalByCurrency,
  IDebtorsState,
};
