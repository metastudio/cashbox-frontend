interface MoneyLocale {
  decimalMark:        string;
  thousandsSeparator: string;
  symbolFirst:        boolean;
}

const MoneyLocales = {
  ru_RU: {
    decimalMark:        ',',
    thousandsSeparator: ' ',
    symbolFirst:        false,
  }
};

export { MoneyLocales as default, MoneyLocale };
