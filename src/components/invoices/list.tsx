import * as React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Switch, Route } from 'react-router-dom';

import Navigation     from './list/navigation';
import AllInvoices    from './list/all';
import UnpaidInvoices from './list/unpaid';

const InvoicesList: React.SFC<{}> = () => {
  return(
    <div>
      <div className="page-header">
        <div className="pull-right">
          <LinkContainer to="/invoices/new">
            <Button>New Invoice</Button>
          </LinkContainer>
        </div>
        <h1>Listing invoices</h1>
      </div>
      <Navigation />
      <Switch>
        <Route exact path="/invoices" component={ AllInvoices } />
        <Route exact path="/invoices/unpaid" component={ UnpaidInvoices } />
      </Switch>
    </div>
  );
};

export default InvoicesList;
