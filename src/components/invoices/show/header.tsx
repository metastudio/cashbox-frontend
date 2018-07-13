import * as React from 'react';
import { Link } from 'react-router-dom';

import { Invoice } from 'services/invoices';
import { formatDateRange } from 'utils/date';

export interface Props {
  invoice: Invoice;
}

const Header: React.SFC<Props> = ({ invoice }) => {
  return (
    <h2>
      <Link to="/invoices">Invoices</Link>
      &nbsp;/
      Invoice { invoice.number ? `#${invoice.number}` : '' } { invoice.customerName } from
      &nbsp;
      { formatDateRange(invoice.startsAt, invoice.endsAt) }
    </h2>
  );
};

export default Header;
