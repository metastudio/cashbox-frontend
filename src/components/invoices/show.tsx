import * as React from 'react';

import { Button, ButtonGroup, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  formatInvoiceTitle,
  IInvoice,
  loadInvoice,
  selectInvoice,
  selectInvoiceStatus,
} from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';
import { selectUserFullName } from 'services/users';

import LoadingView from 'components/utils/loading-view';
import Complete from './complete';
import DownloadPDFButton from './download_pdf';
import DestroyButton from './show/destroy';
import InvoiceTable from './show/table';

interface IStateProps {
  orgId:        number;
  status:       Status;
  invoice:      IInvoice | null;
  userFullName: string;
}

interface IDispatchProps {
  load: (orgId: number, invoiceId: number) => void;
}

type IProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

class ShowInvoice extends React.PureComponent<IProps> {
  private renderEditButton = (invoice: IInvoice) => (
    <LinkContainer to={ `/invoices/${invoice.id}/edit` }>
      <Button>Edit</Button>
    </LinkContainer>
  )

  private renderCompleteButton = (invoice: IInvoice) => (
    <LinkContainer to={ `/invoices/${invoice.id}/complete` }>
      <Button bsStyle="primary">Complete</Button>
    </LinkContainer>
  )

  public completePage = () => {
    const { invoice } = this.props;
    if (!invoice) { return null; }

    return <Complete invoice={ invoice } />;
  }

  public componentDidMount() {
    const { orgId, load, match } = this.props;
    load(orgId, Number(match.params.id));
  }

  public render() {
    if (this.props.status !== Status.Success || !this.props.invoice) {
      return <LoadingView status={ this.props.status } />;
    }

    const { invoice, userFullName } = this.props;
    return (
      <>
        <PageHeader>
          <ButtonGroup className="pull-right">
            <DestroyButton />
            { this.renderEditButton(invoice) }
            { !invoice.paidAt && this.renderCompleteButton(invoice) }
            <DownloadPDFButton invoice={ invoice }/>
          </ButtonGroup>
          { formatInvoiceTitle(invoice) }
        </PageHeader>

        <Route exact path="/invoices/:id/complete" component={ this.completePage } />

        <InvoiceTable invoice={ invoice } userFullName={ userFullName } />
      </>
    );
  }
}

const mapState = (state: IGlobalState) => ({
  orgId:        selectCurrentOrganizationId(state),
  status:       selectInvoiceStatus(state),
  invoice:      selectInvoice(state),
  userFullName: selectUserFullName(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load:         (orgId: number, invoiceId: number) => dispatch(loadInvoice(orgId, invoiceId)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(ShowInvoice));
