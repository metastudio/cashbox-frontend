interface Money {
  fractional: string;

  currency: {
    isoCode: string;
    subunitToUnit: number;
    symbol: string;
  };
}

// I found that money format looks better if you use native locale for currency
const localeForCurrency = (isoCode: string): string | undefined => {
  switch (isoCode) {
    case 'USD':
    case 'EUR':
      return 'en-US';
    case 'RUB':
      return 'ru-RU';
    default:
      return undefined;
  }
};

const formatMoney = (money?: Money): string | null => {
  if (!money) { return null; }

  const float = Number(money.fractional) / money.currency.subunitToUnit;
  return float.toLocaleString(
    localeForCurrency(money.currency.isoCode),
    {
      style: 'currency',
      currency: money.currency.isoCode,
      currencyDisplay: 'symbol',
    }
  );
};

export { Money, formatMoney };
