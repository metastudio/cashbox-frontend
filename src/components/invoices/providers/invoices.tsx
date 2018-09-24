import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, IPagination, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  IInvoice,
  loadInvoices,
  selectInvoices,
  selectInvoicesPagination,
  selectInvoicesStatus,
} from 'services/invoices';
import { parseQuery } from 'utils/url-helpers';

import LoadingView from 'components/utils/loading-view';

interface IOwnProps {
  orgId:    ID;
  search:   string;
  children: (
    invoices:   IInvoice[],
    pagination: IPagination | null,
  ) => React.ReactNode;
}

interface IStateProps {
  status:     Status;
  invoices:   IInvoice[];
  pagination: IPagination | null;
}

interface IDispatchProps {
  load: (orgId: number, params: object) => void;
}

type IProps = IOwnProps & IStateProps & IDispatchProps;

class InvoicesProvider extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, load, search } = this.props;
    load(orgId, parseQuery(search));
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { search: prevSearch } = prevProps;
    const { status, search } = this.props;

    if (status === Status.Invalid || search !== prevSearch) {
      this.loadData();
    }
  }

  public renderContent = () => {
    const { invoices, pagination, children } = this.props;

    return children(invoices, pagination);
  }

  public render() {
    return (
      <LoadingView status={ this.props.status }>
        { this.renderContent }
      </LoadingView>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  status:     selectInvoicesStatus(state),
  invoices:   selectInvoices(state),
  pagination: selectInvoicesPagination(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: (orgId, params) => dispatch(loadInvoices(orgId, params)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapState, mapDispatch)(InvoicesProvider);
