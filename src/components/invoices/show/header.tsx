import * as React from 'react';
import { Link } from 'react-router-dom';

import { Invoice } from 'model-types';
import { invoiceDateRange } from 'utils/invoice';

export interface Props {
  invoice: Invoice;
}

const Header: React.SFC<Props> = ({ invoice }) => {
  return (
    <h2>
      <Link to="/invoices">Invoices</Link>
      &nbsp;/
      Invoice { invoice.number ? `#${invoice.number}` : '' } { invoice.customerName } from { invoiceDateRange }
    </h2>
  );
};

export default Header;
