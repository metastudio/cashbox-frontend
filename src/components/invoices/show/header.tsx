import * as React from 'react';
import { Link } from 'react-router-dom';

import { Invoice } from 'model-types';

export interface Props {
  invoice: Invoice;
}

const Header: React.SFC<Props> = ({ invoice }) => {
  const invoiceNumber = () => {
    if (!invoice.number) { return ''; }
    return `#${invoice.number}`;
  };

  const invoiceDateRange = () => {
    return([invoice.startsAt, invoice.endsAt].filter(x => !!x).join(' - '));
  };

  return (
    <h2>
      <Link to="/invoices/list">Invoices</Link>
      &nbsp;/
      Invoice { invoiceNumber() } { invoice.customerName } from { invoiceDateRange() }
    </h2>
  );
};

export default Header;
