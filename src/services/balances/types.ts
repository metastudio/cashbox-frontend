import { IMoney } from 'utils/money';

interface IBalance {
  total:     IMoney;
  exTotal?:  IMoney;
  rate:      string;
  currency:  string;
  updatedAt: Date;
}

export { IBalance };
