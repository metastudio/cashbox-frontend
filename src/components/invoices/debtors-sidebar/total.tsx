import * as React from 'react';
import { formatMoney, IMoney } from 'utils/money';

interface IProps {
  total: IMoney | null;
}

const Total: React.SFC<IProps> = ({ total }) => {
  if (total === null) { return null; }

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
