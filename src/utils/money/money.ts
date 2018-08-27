import * as accounting from 'accounting';

import Locales from './locales';
import { IMoney, IMoneyLocale } from './types';

const defaultMoneyLocale: IMoneyLocale = Locales.ru_RU;

/**
 * Format money value with default locale
 * @param {IMoney} money - money value to format
 * @param {IMoneyLocale} locale - locale in which format money value
 */
const formatMoney = (money?: IMoney, locale: IMoneyLocale = defaultMoneyLocale): string | undefined => {
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
 * @param {IMoney} money - money value to format
 * @param {IMoneyLocale} locale - locale in which format money value
 */
const formatMoneyValue = (money?: IMoney | string, locale: IMoneyLocale = defaultMoneyLocale): string | undefined => {
  if (!money) { return undefined; }

  let amount;
  let precision;
  if (typeof money === 'string') {
    amount = money;
    precision = 2;
  } else {
    amount = Number(money.fractional) / money.currency.subunitToUnit;
    precision = Math.log10(money.currency.subunitToUnit);
  }

  return accounting.formatMoney(amount, {
    precision,
    format:    '%v',
    decimal:   locale.decimalMark,
    thousand:  locale.thousandsSeparator,
  });
};

/**
 * Reformat money string to format accepted by API
 * @param {string} str - string representation of money
 * @param {IMoneyLocale} locale - locale in which money is formatted
 */
const formatMoneyParam = (str?: string, locale: IMoneyLocale = defaultMoneyLocale): string | undefined => {
  if (!str) { return undefined; }

  return accounting.formatNumber(
    accounting.unformat(str, locale.decimalMark),
    {
      precision: 2,
      thousand:  '',
      decimal:   '.',
    },
  );
};

export { IMoney, formatMoney, formatMoneyValue, formatMoneyParam, defaultMoneyLocale };
