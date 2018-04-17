interface Money {
  fractional: string;

  currency: {
    isoCode: string;
    subunitToUnit: number;
  };
}

const Formatters = {
  'USD': new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
  }),
  'RUB': new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
  }),
  'EUR': new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'symbol',
  }),
};

const formatMoney = (money?: Money): string | undefined => {
  if (!money) { return undefined; }
  const formatter = Formatters[money.currency.isoCode];
  if (!formatter) { return undefined; }

  const float = Number(money.fractional) / money.currency.subunitToUnit;

  return formatter.format(float);
};

export { Money, formatMoney };
