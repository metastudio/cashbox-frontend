import * as React from 'react';

import { PageHeader } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';

import AllInvoices    from './list/all';
import Navigation     from './list/navigation';
import UnpaidInvoices from './list/unpaid';

const InvoicesList: React.SFC<{}> = () => {
  return(
    <>
      <PageHeader>
        <Link to="/invoices/new" className="btn btn-default pull-right">Add Invoice...</Link>
        Invoices
        </PageHeader>
      <Navigation />
      <Switch>
        <Route exact path="/invoices" component={ AllInvoices } />
        <Route exact path="/invoices/unpaid" component={ UnpaidInvoices } />
      </Switch>
    </>
  );
};

export default InvoicesList;
