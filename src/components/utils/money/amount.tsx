import * as React from 'react';

import { Money, formatMoney } from 'utils/money';

import './index.css';

interface Props {
  amount?: Money;
}

const MoneyAmount: React.SFC<Props> = ({ amount }) => {
  if (!amount) { return null; }

  return (
    <span className="money-amount">{ formatMoney(amount) }</span>
  );
};

export default MoneyAmount;
