import * as React from 'react';
import { Link } from 'react-router-dom';

import { Invoice } from 'model-types';
import { invoiceDateRange } from 'utils/invoice';
import { formatMoney } from 'utils/money';
import { formatDate } from 'utils/date';

interface Props {
  invoice: Invoice;
}

const InvoiceRow: React.SFC<Props> = ({ invoice }) => (
  <tr className={ invoice.paidAt ? 'bg-success' : '' }>
    <td>{ invoice.customerName }</td>
    <td>{ invoiceDateRange(invoice) }</td>
    <td>{ formatMoney(invoice.amount) }</td>
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
