import * as React from 'react';
import { Link } from 'react-router-dom';

import { Invoice } from 'model-types';

import { formatMoney } from 'utils/money';

interface Props {
  invoice: Invoice;
}

const InvoiceRow: React.SFC<Props> = ({ invoice }) => (
  <tr className={ invoice.paidAt ? 'bg-success' : '' }>
    <td>{ invoice.customerName }</td>
    <td>{ invoice.startsAt || '…' } — { invoice.endsAt || '…' }</td>
    <td>{ formatMoney(invoice.amount) }</td>
    <td>{ invoice.sentAt }</td>
    <td>{ invoice.paidAt }</td>
    <td className="text-center">
      <Link to={ `/invoices/${ invoice.id }` } >
        <i className="fa fa-eye" />
      </Link>
    </td>
  </tr>
);

export default InvoiceRow;
