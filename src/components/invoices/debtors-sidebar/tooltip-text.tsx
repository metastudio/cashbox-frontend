import * as React from 'react';

import { formatDate } from 'utils/date';
import { formatMoney, IConvertedAmount } from 'utils/money';

interface IProps {
  amount: IConvertedAmount;
}

const TooltipText: React.SFC<IProps> = ({ amount }) => {
  if  (!amount.amount) { return null; }
  return(
    <span>
      { formatMoney(amount.amount) }
      <br />
      { amount.oldAmount.currency.isoCode }/{ amount.amount.currency.isoCode }
      <br />
      rate: { amount.rate }
      <br />
      by: { formatDate(amount.updatedAt) }
    </span>
  );
};

export default TooltipText;
