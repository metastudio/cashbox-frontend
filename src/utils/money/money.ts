import * as accounting from 'accounting';

import Locales, { MoneyLocale } from './locales';

interface Money {
  fractional: string;
  currency: Currency;
}

interface Currency {
  isoCode:       string;
  name:          string;
  symbol:        string;
  subunitToUnit: number;
  htmlEntity:    string;
}

interface ConvertedAmount {
  amount?: Money;
  oldAmount: Money;
  updatedAt?: string;
  rate: number;
  total: Money;
}

const defaultMoneyLocale: MoneyLocale = Locales.ru_RU;

/**
 * Format money value with default locale
 * @param {Money} money - money value to format
 * @param {MoneyLocale} locale - locale in which format money value
 */
const formatMoney = (money?: Money, locale: MoneyLocale = defaultMoneyLocale): string | undefined => {
  if (!money) { return undefined; }

  const amount = Number(money.fractional) / money.currency.subunitToUnit;

  return accounting.formatMoney(amount, {
    symbol:    money.currency.symbol,
    format:    locale.symbolFirst ? '%s %v' : '%v %s',
    decimal:   locale.decimalMark,
    thousand:  locale.thousandsSeparator,
    precision: Math.log10(money.currency.subunitToUnit),
  });
};

/**
 * Format money value to show in input
 * @param {Money} money - money value to format
 * @param {MoneyLocale} locale - locale in which format money value
 */
const formatMoneyValue = (money?: Money, locale: MoneyLocale = defaultMoneyLocale): string | undefined => {
  if (!money) { return undefined; }

  const amount = Number(money.fractional) / money.currency.subunitToUnit;

  return accounting.formatMoney(amount, {
    format:    '%v',
    decimal:   locale.decimalMark,
    thousand:  locale.thousandsSeparator,
    precision: Math.log10(money.currency.subunitToUnit),
  });
};

/**
 * Reformat money string to format accepted by API
 * @param {string} str - string representation of money
 * @param {MoneyLocale} locale - locale in which money is formatted
 */
const formatMoneyParam = (str?: string, locale: MoneyLocale = defaultMoneyLocale): string | undefined => {
  if (!str) { return undefined; }

  return accounting.formatNumber(
    accounting.unformat(str, locale.decimalMark),
    {
      precision: 2,
      thousand:  '',
      decimal:   '.',
    }
  );
};

export { Money, formatMoney, formatMoneyValue, formatMoneyParam, defaultMoneyLocale, Currency, ConvertedAmount };
