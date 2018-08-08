import * as React from 'react';
import { flatten } from 'lodash';

import { IDebtor } from 'services/debtors';
import { IConvertedAmount, formatMoney } from 'utils/money';

import ConvertedDebt from './converted-debt';

interface IProps {
  debtors: IDebtor[];
}

const Debtors: React.SFC<IProps> = ({ debtors }) => {
  const debtorRender = (amount: IConvertedAmount) => {
    if (amount.amount) {
      return <ConvertedDebt amount={ amount } />;
    } else {
      return (
        <td className="text-right">
          { formatMoney(amount.oldAmount) }
        </td>
      );
    }
  };

  const renderDebtors = flatten(debtors.map(debtor => (
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
