import * as React from 'react';
import { Link } from 'react-router-dom';

import { IInvoice } from 'services/invoices';
import { formatDateRange } from 'utils/date';

export interface IProps {
  invoice: IInvoice;
}

const Header: React.SFC<IProps> = ({ invoice }) => (
  <h2>
    <Link to="/invoices">Invoices</Link>
    &nbsp;/
    Invoice { invoice.number ? `#${invoice.number}` : '' } { invoice.customerName } from
    &nbsp;
    { formatDateRange(invoice.startsAt, invoice.endsAt) }
  </h2>
);

export default Header;
