import * as React from 'react';
import { flatten } from 'lodash';

import { Debtor } from 'services/debtors';
import { ConvertedAmount, formatMoney } from 'utils/money';

import ConvertedDebt from './converted-debt';

interface Props {
  debtors: Debtor[];
}

const Debtors: React.SFC<Props> = ({ debtors }) => {
  const debtorRender = (amount: ConvertedAmount) => {
    if (amount.amount) {
      return <ConvertedDebt amount={ amount } />;
    } else {
      return(
        <td className="text-right">
          { formatMoney(amount.oldAmount) }
        </td>
      );
    }
  };

  const renderDebtors = flatten(debtors.map((debtor) => (
    debtor.amounts.map((amount, index) => (
      <tr key={ `${debtor.name}_${index}` }>
        <td>{ debtor.name }</td>
        { debtorRender(amount) }
      </tr>
    ))
  )));

  return( 
    <>
      { renderDebtors }
    </>
  );
};

export default Debtors;
