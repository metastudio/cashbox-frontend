import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Invoice } from 'model-types';
import * as statuses from 'constants/statuses.js';
import {
  loadInvoice,
  destroyInvoice,
  downloadInvoicePDF,
} from 'actions/invoices.js';
import { addFlashMessage } from 'actions/flash-messages.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectUserFullName } from 'selectors/users.js';
import { selectInvoice, selectInvoiceStatus } from 'selectors/invoices.js';

import Header from './show/header';
import InvoiceTable from './show/table';
import LoadingView from '../utils/loading-view';

interface StateProps {
  orgId:        number;
  status:       string;
  invoice:      Invoice | null;
  userFullName: string;
}

interface DispatchProps {
  load:         (orgId: number, invoiceId: number) => void;
  destroy:      (orgId: number, invoiceId: number) => Promise<{}>;
  downloadPDF:  (orgId: number, invoiceId: number) => void;
  flashMessage: (message: string) => void;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props =  RouteProps & StateProps & DispatchProps;

class ShowInvoice extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load, match } = this.props;
    load(orgId, Number(match.params.id));
  }

  handleDestroy = () => {
    const { orgId, invoice, destroy } = this.props;
    if (!invoice) { return; }

    destroy(orgId, invoice.id).then(() => {
      const { flashMessage, history } = this.props;

      flashMessage('Invoice successfully destroyed');
      history.push('/invoices');
    });
  }

  handleDownloadPDF = () => {
    const { orgId, invoice, downloadPDF } = this.props;
    if (!invoice) { return; }

    downloadPDF(orgId, invoice.id);
  }

  render() {
    if (this.props.status !== statuses.SUCCESS || !this.props.invoice) {
      return <LoadingView status={ this.props.status } />;
    }

    const { invoice, userFullName } = this.props;

    const completeInvoiceButton = !invoice.paidAt
      ? <Button bsStyle="primary">Complete Invoice</Button>
      : null;

    return (
      <>
        <div className="page-header">
          <ButtonGroup className="pull-right">
            <Button bsStyle="danger" onClick={ this.handleDestroy }>Destroy</Button>
            <LinkContainer to={ `/invoices/${ invoice.id }/edit` }>
              <Button>Edit</Button>
            </LinkContainer>
            { completeInvoiceButton }
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
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load:         (orgId: number, invoiceId: number) => dispatch(loadInvoice(orgId, invoiceId)),
  destroy:      (orgId: number, invoiceId: number) => new Promise((res, rej) => {
    dispatch(destroyInvoice(orgId, invoiceId, res, rej));
  }),
  downloadPDF:  (orgId: number, invoiceId: number | string) => dispatch(downloadInvoicePDF(orgId, invoiceId)),
  flashMessage: (msg: string) => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(ShowInvoice));
