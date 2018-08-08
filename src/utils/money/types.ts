interface IMoney {
  fractional: string;
  currency: ICurrency;
}

interface ICurrency {
  isoCode:       string;
  name:          string;
  symbol:        string;
  subunitToUnit: number;
  htmlEntity:    string;
}

interface IConvertedAmount {
  amount?: IMoney;
  oldAmount: IMoney;
  updatedAt?: Date;
  rate: number;
  total: IMoney;
}

interface IMoneyLocale {
  decimalMark:        string;
  thousandsSeparator: string;
  symbolFirst:        boolean;
}

export { IMoney, ICurrency, IConvertedAmount, IMoneyLocale };
