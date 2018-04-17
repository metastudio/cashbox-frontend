import * as React from 'react';

import { Invoice } from 'model-types';
import { formatMoney } from 'utils/money';

interface Props {
  invoice: Invoice;
}

const Items: React.SFC<Props> = ({ invoice: { invoiceItems, currency }}) => {
  if (invoiceItems.length <= 0) { return <></>; }

  const items = invoiceItems.map((item, index) => (
    <tr key={ index } >
      <td>{ item.description }</td>
      <td>{ item.date }</td>
      <td className="text-right">{ item.hours }</td>
      <td className="text-right">{ formatMoney(item.amount) }</td>
    </tr>
  ));

  return(
    <>
      <tr>
        <td><strong>Task</strong></td>
        <td><strong>Date</strong></td>
        <td className="text-right"><strong>Hours</strong></td>
        <td className="text-right"><strong>{ currency }</strong></td>
      </tr>
      { items }
    </>
  );
};

export default Items;
