type CurrencyCode = string;

interface IMoney {
  fractional: string;
  currency: ICurrency;
}

interface ICurrency {
  isoCode:       CurrencyCode;
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

export { CurrencyCode, IMoney, ICurrency, IConvertedAmount, IMoneyLocale };
