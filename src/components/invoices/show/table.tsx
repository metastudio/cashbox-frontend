import * as React from 'react';

import { Invoice } from 'model-types';
import { AmountDecorator } from 'components/utils/decorators/amount_decorator';
import Items from './items';

interface Props {
  invoice:      Invoice;
  userFullName: string;
}

const Table: React.SFC<Props> = ({ invoice, userFullName }) => {
  const invoiceNumber = () => {
    if (!invoice.number) { return; }
    return(
      <p>
        <strong>Invoice #${ invoice.number }</strong>
      </p>
    );
  };

  return(
    <table className="table invoice table-bordered ">
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
            { invoice.customerDetails }
            <br/>Currency: { invoice.currency }
          </td>
          <td/>
          <td className="text-right">
            <strong className="text-uppercase">Date: { invoice.endsAt }</strong>
            { invoiceNumber() }
          </td>
        </tr>
        <tr>
          <td>
            <div className="text-uppercase">
              Bill to:
            </div>
            { invoice.customerName }
          </td>
          <td/>
          <td className="text-right">
            <h2>
              Total:
            </h2>
          </td>
          <td>
            <h2 className="text-right">
              <AmountDecorator amount={ invoice.amount } />
            </h2>
          </td>
        </tr>
        <Items invoice={ invoice } />
      </tbody>
    </table>
  );
};

export default Table;
