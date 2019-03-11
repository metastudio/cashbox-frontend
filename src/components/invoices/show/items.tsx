import * as React from 'react';

import { IInvoice } from 'services/invoices';
import { formatDate } from 'utils/date';

import { MoneyAmount } from 'components/utils/money';

interface IProps {
  invoice: IInvoice;
}

const Items: React.SFC<IProps> = ({ invoice: { invoiceItems, currency } }) => {
  if (invoiceItems.length <= 0) { return null; }

  const items = invoiceItems.map((item, index) => (
    <tr key={ index } >
      <td>{ item.description || item.customerName }</td>
      <td>{ formatDate(item.date) }</td>
      <td className="text-right">{ item.hours }</td>
      <td className="text-right"><MoneyAmount amount={ item.amount } /></td>
    </tr>
  ));

  return(
    <>
      <tr>
        <th>Task</th>
        <th>Date</th>
        <th className="text-right">Hours</th>
        <th className="text-right">{ currency }</th>
      </tr>
      { items }
    </>
  );
};

export default Items;
