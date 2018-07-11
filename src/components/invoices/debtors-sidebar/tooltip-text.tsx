import * as React from 'react';

import { formatMoney } from 'utils/money';
import { Debtor } from 'services/debtors/types';

interface Props {
  debtor: Debtor;
}

const TooltipText: React.SFC<Props> = ({ debtor }) => {
  if  (!debtor.amount.amount) { return null; }
  return(
    <>
      <p>{ formatMoney(debtor.amount.amount) }</p>
      <p>{ debtor.amount.oldAmount.currency.isoCode }/{ debtor.amount.amount.currency.isoCode }</p>
      <p>rate: { debtor.amount.rate }</p>
      <p>by: { debtor.amount.updatedAt }</p>
    </>
  );
};

export default TooltipText;
