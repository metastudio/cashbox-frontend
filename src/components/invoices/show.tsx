import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Invoice } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { loadInvoice } from 'actions/invoices.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectUserFullName } from 'selectors/users.js';
import { selectInvoice, selectInvoiceStatus } from 'selectors/invoices.js';

import Header from './show/header';
import InvoiceTable from './show/table';
import DestroyButton from './show/destroy';
import LoadingView from '../utils/loading-view';
import DownloadPDFButton from './download_pdf';

interface StateProps {
  orgId:        number;
  status:       string;
  invoice:      Invoice | null;
  userFullName: string;
}

interface DispatchProps {
  load:         (orgId: number, invoiceId: number) => void;
}

type RouteProps = RouteComponentProps<{ id: string }>;
type Props =  RouteProps & StateProps & DispatchProps;

class ShowInvoice extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load, match } = this.props;
    load(orgId, Number(match.params.id));
  }

  render() {
    if (this.props.status !== statuses.SUCCESS || !this.props.invoice) {
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
            { !invoice.paidAt ? <Button bsStyle="primary">Complete Invoice</Button> : null }
            <DownloadPDFButton invoice={ invoice }/>
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
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(ShowInvoice));
