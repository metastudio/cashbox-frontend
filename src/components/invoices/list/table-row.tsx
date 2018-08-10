import * as React from 'react';
import { Link } from 'react-router-dom';

import { IInvoice } from 'services/invoices';
import { formatDate, formatDateRange } from 'utils/date';

import { MoneyAmount } from 'components/utils/money';

interface IProps {
  invoice: IInvoice;
}

const InvoiceRow: React.SFC<IProps> = ({ invoice }) => (
  <tr className={ invoice.paidAt ? 'bg-success' : '' }>
    <td>{ invoice.customerName }</td>
    <td>{ formatDateRange(invoice.startsAt, invoice.endsAt) }</td>
    <td><MoneyAmount amount={ invoice.amount } /></td>
    <td>{ formatDate(invoice.sentAt) }</td>
    <td>{ formatDate(invoice.paidAt) }</td>
    <td className="text-center">
      <Link to={ `/invoices/${ invoice.id }` } >
        <i className="fa fa-eye" />
      </Link>
    </td>
  </tr>
);

export default InvoiceRow;
