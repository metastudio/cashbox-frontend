import * as React from 'react';

import { IInvoice } from 'services/invoices';

import Row from './table-row';

interface IProps {
  invoices: IInvoice[];
}

const InvoicesTableBody: React.SFC<IProps> = ({ invoices }) => (
  <tbody>
    { invoices.map(i => <Row invoice={ i } key={ i.id } />) }
  </tbody>
);

export default InvoicesTableBody;
