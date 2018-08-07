import * as React from 'react';
import { formatMoney, Money } from 'utils/money';

interface Props {
  total: Money | null;
}

const Total: React.SFC<Props> = ({ total }) => {
  if ( total === null) { return null; }
  return(
    <thead>
      <tr>
        <th>Total</th>
        <th className="text-right">
          { formatMoney(total) }
        </th>
      </tr>
    </thead>
  );
};

export default Total;
