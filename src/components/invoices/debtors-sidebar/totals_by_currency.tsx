import * as React from 'react';

import { TotalByCurrency } from 'services/debtors';
import { formatMoney } from 'utils/money';

interface Props {
  totals: TotalByCurrency[] | null;
}

const TotalsByCurrency: React.SFC<Props> = ({ totals }) => {
  if (totals === null) { return null; }

  const renderTotals = totals.map((summ) => (
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
