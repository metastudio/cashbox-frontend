import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Invoice, Customer } from 'model-types';
import * as statuses from 'constants/statuses.js';
import {
  loadInvoice,
  downloadInvoicePDF,
} from 'actions/invoices.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectUserFullName } from 'selectors/users.js';
import { selectInvoice, selectInvoiceStatus } from 'selectors/invoices.js';
import { selectCustomers } from 'selectors/customers.js';

import Header from './show/header';
import InvoiceTable from './show/table';
import CompleteInvoiceButton from './show/complete.jsx';
import DestroyButton from './show/destroy';
import LoadingView from '../utils/loading-view';
import { loadCustomers } from 'actions/customers.js';

interface StateProps {
  orgId:        number;
  status:       string;
  invoice:      Invoice | null;
  userFullName: string;
  customers:    Customer[];
}

interface DispatchProps {
  load:         (orgId: number, invoiceId: number) => void;
  downloadPDF:  (orgId: number, invoiceId: number) => void;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props = RouteProps & StateProps & DispatchProps;

class ShowInvoice extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load, match, customers } = this.props;
    load(orgId, Number(match.params.id));
    if (customers) { return; }
    loadCustomers(orgId);
  }

  handleDownloadPDF = () => {
    const { orgId, invoice, downloadPDF } = this.props;
    if (!invoice) { return; }

    downloadPDF(orgId, invoice.id);
  }

  render() {
    if (this.props.status !== statuses.SUCCESS || !this.props.invoice || !this.props.customers) {
      return <LoadingView status={ this.props.status } />;
    }

    const { invoice, userFullName } = this.props;
    return (
      <>
        <div className="page-header">
          <ButtonGroup className="pull-right">
            <DestroyButton />
            <LinkContainer to={ `/invoices/${ invoice.id }/edit` }>
              <Button>Edit</Button>
            </LinkContainer>
            { !invoice.paidAt ? <CompleteInvoiceButton /> : null }
            <Button onClick={ this.handleDownloadPDF }>Download as PDF</Button>
          </ButtonGroup>
          <Header invoice={ invoice } />
        </div>

        <InvoiceTable invoice={ invoice } userFullName={ userFullName } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:        getCurrentOrganizationId(state),
  status:       selectInvoiceStatus(state),
  invoice:      selectInvoice(state),
  userFullName: selectUserFullName(state),
  customers:    selectCustomers(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load:         (orgId: number, invoiceId: number) => dispatch(loadInvoice(orgId, invoiceId)),
  downloadPDF:  (orgId: number, invoiceId: number | string) => dispatch(downloadInvoicePDF(orgId, invoiceId)),
  loadCustomers: (orgId: number) => dispatch(loadCustomers(orgId)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(ShowInvoice));
