import * as React from 'react';

import { Invoice } from 'services/invoices';

import Row from './table-row';

interface Props {
  invoices: Invoice[];
}

const InvoicesTableBody: React.SFC<Props> = ({ invoices }) => (
  <tbody>
    { invoices.map((i) => <Row invoice={ i } key={ i.id } />) }
  </tbody>
);

export default InvoicesTableBody;
