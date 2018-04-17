import * as React from 'react';

import { Money } from 'utils/money';

interface Props {
  amount: Money;
}

export const AmountDecorator: React.SFC<Props> = ({ amount }) => {
  const cleanAmount = String(Number(amount.fractional));
  const mainPart = cleanAmount.substr(0, (cleanAmount.length - 2));
  const formatAmount = mainPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const output = () => `${formatAmount}${amount.currency.symbol }`;
  return(
    <>
      { output() }
    </>
  );
};
