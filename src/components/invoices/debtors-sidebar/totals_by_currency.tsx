import * as React from 'react';

import { ITotalByCurrency } from 'services/debtors';
import { formatMoney } from 'utils/money';

interface IProps {
  totals: ITotalByCurrency[] | null;
}

const TotalsByCurrency: React.SFC<IProps> = ({ totals }) => {
  if (totals === null) { return null; }

  const renderTotals = totals.map(summ => (
    <tr key={ summ.name }>
      <td>{ summ.name }</td>
      <td className="text-right">
        { formatMoney(summ.amount) }
      </td>
    </tr>
  ));

  return(
    <>
      { renderTotals }
    </>
  );
};

export default TotalsByCurrency;
