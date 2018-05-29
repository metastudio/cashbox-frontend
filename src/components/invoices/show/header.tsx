import * as React from 'react';
import { Link } from 'react-router-dom';

import { Invoice } from 'model-types';

export interface Props {
  invoice: Invoice;
}

const Header: React.SFC<Props> = ({ invoice }) => {
  const invoiceDateRange = [invoice.startsAt, invoice.endsAt].filter(x => !!x).join(' - ');
  return (
    <h2>
      <Link to="/invoices">Invoices</Link>
      &nbsp;/
      Invoice { invoice.number ? `#${invoice.number}` : '' } { invoice.customerName } from { invoiceDateRange }
    </h2>
  );
};

export default Header;
