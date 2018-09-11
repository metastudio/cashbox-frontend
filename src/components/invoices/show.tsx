import * as React from 'react';

import { Button, ButtonGroup, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';

import { IGlobalState } from 'services/global-state';
import {
  formatInvoiceTitle,
  IInvoice,
} from 'services/invoices';
import { selectUserFullName } from 'services/users';

import { ICurrentOrgIdProps, withCurrentOrgId } from 'components/organizations/current-organization';
import Spinner from 'components/utils/spinner';
import Complete from './complete';
import DownloadPDFButton from './download_pdf';
import Provider from './providers/invoice';
import DestroyButton from './show/destroy';
import InvoiceTable from './show/table';

interface IStateProps {
  userFullName: string;
}

type IProps = RouteComponentProps<{ id: string }> & ICurrentOrgIdProps & IStateProps;

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

  private renderSpinner = () => {
    return (
      <>
        <PageHeader>Invoice</PageHeader>
        <Spinner />
      </>
    );
  }

  private renderContent = (invoice: IInvoice) => {
    const { userFullName } = this.props;

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

        <Route
          exact
          path="/invoices/:id/complete"
          // tslint:disable-next-line:jsx-no-lambda
          render={ () => <Complete invoice={ invoice } /> }
        />

        <InvoiceTable invoice={ invoice } userFullName={ userFullName } />
      </>
    );
  }

  public render() {
    const { orgId, match: { params: { id } } } = this.props;

    return (
      <Provider
        orgId={ orgId }
        invoiceId={ Number(id) }
        spinner={ this.renderSpinner }
      >
        { this.renderContent }
      </Provider>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  userFullName: selectUserFullName(state),
});

export default withRouter(withCurrentOrgId(connect<IStateProps>(mapState)(ShowInvoice)));
