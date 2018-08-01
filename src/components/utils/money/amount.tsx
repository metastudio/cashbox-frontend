import * as React from 'react';

import { Money, formatMoney } from 'utils/money';

import './index.css';

interface Props {
  amount?: Money;
  colorize?: boolean | 'onlyNegative';
  transfer?: boolean;
}

const MoneyAmount: React.SFC<Props> = ({ amount, colorize, transfer }) => {
  if (!amount) { return null; }

  const classNames = ['money-amount'];
  if (colorize === true) {
    if (transfer) {
      classNames.push('money-amount-transfer');
    } else {
      classNames.push(Number(amount.fractional) >= 0 ? 'money-amount-positive' : 'money-amount-negative');
    }
  } else if (colorize === 'onlyNegative' && Number(amount.fractional) < 0) {
    classNames.push('money-amount-negative');
  }

  return (
    <span className={ classNames.join(' ') }>{ formatMoney(amount) }</span>
  );
};

export default MoneyAmount;
