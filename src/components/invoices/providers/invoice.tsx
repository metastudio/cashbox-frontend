import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  IInvoice,
  loadInvoice,
  selectInvoice,
  selectInvoiceStatus,
} from 'services/invoices';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:     ID;
  invoiceId: ID;
  children:  (invoice: IInvoice) => React.ReactNode;
  spinner?:  React.ReactNode | (() => React.ReactNode);
}

interface IStateProps {
  status:  Status;
  invoice: IInvoice | null;
}

interface IDispatchProps {
  load: (orgId: ID, invoiceId: ID) => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class InvoiceProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, invoiceId, load, status, invoice } = this.props;

    if (status === Status.Invalid || (invoice && invoice.id !== invoiceId)) {
      load(orgId, invoiceId);
    }
  }

  private renderChildren = () => {
    const { invoice, children } = this.props;
    if (!invoice) { return null; }

    return children(invoice);
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate() {
    this.loadData();
  }

  public render() {
    const { status, spinner } = this.props;

    return(
      <LoadingView status={ status } spinner={ spinner }>
        { this.renderChildren }
      </LoadingView>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  status:  selectInvoiceStatus(state),
  invoice: selectInvoice(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, invoiceId) => dispatch(loadInvoice(orgId, invoiceId)),
});

// `withRouter` added to prevent update blocking
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
export default withRouter<RouteComponentProps<IOwnProps> & IOwnProps>(
  connect<IStateProps, IDispatchProps, RouteComponentProps<IOwnProps>>(
    mapState, mapDispatch,
  )(InvoiceProvider),
);
