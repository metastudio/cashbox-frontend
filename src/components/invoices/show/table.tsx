import * as React from 'react';
import { Table as BsTable } from 'react-bootstrap';

import { Invoice } from 'model-types';
import { formatMoney } from 'utils/money';
import Items from './items';

interface Props {
  invoice:      Invoice;
  userFullName: string;
}

const Table: React.SFC<Props> = ({ invoice, userFullName }) => (
  <BsTable bordered className="invoice">
    <tbody>
      <tr>
        <td>
          <h2 className="word-break">
            { userFullName }
          </h2>
        </td>
        <td/>
        <td/>
        <td>
          <h1 className="text-right text-uppercase">
            Invoice
          </h1>
        </td>
      </tr>
      <tr>
        <td/>
        <td className="word-break">
          Bank account for wire transfers:<br/>{ userFullName }
          <p>
            { invoice.invoiceDetails }
          </p>
          <br/>correspondent account<br/>
          { invoice.customer ? invoice.customer.invoice_details : null }
          <br/>Currency: { invoice.currency }
        </td>
        <td/>
        <td className="text-right">
          <strong className="text-uppercase">Date: { invoice.endsAt }</strong>
          { invoice.number ? <p><strong>Invoice #{ invoice.number }</strong></p> : null }
        </td>
      </tr>
      <tr>
        <td>
          <div className="text-uppercase">
            Bill to:
          </div>
          { invoice.customer ? invoice.customer.name : null }
        </td>
        <td/>
        <td className="text-right">
          <h2>
            Total:
          </h2>
        </td>
        <td>
          <h2 className="text-right">
            { formatMoney(invoice.amount) }
          </h2>
        </td>
      </tr>
      <Items invoice={ invoice } />
    </tbody>
  </BsTable>
);

export default Table;
