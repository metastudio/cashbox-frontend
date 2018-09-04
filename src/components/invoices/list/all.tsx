import * as React from 'react';

import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { IPagination, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  IInvoice,
  loadInvoices,
  selectInvoices, selectInvoicesPagination, selectInvoicesStatus,
} from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';
import { parseQuery } from 'utils/url-helpers';

import LoadingView from 'components/utils/loading-view';
import { SimplePaginator } from 'components/utils/paginator';
import TableBody from './table-body';
import TableHeader from './table-header';

interface IStateProps {
  orgId:      number;
  status:     Status;
  invoices:   IInvoice[] | null;
  pagination: IPagination;
}

interface IDispatchProps {
  load: (orgId: number, params: object) => void;
}

type Props = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class AllInvoices extends React.Component<Props> {
  private loadData = (props: Props) => {
    const { orgId, load, location: { search } } = props;
    load(orgId, parseQuery(search));
  }

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate(prevProps: Props) {
    const { location: { search: prevSearch } } = prevProps;
    const { status, location: { search } } = this.props;

    if (status === Status.Invalid || search !== prevSearch) {
      this.loadData(this.props);
    }

  }

  public render() {
    const { status, invoices } = this.props;

    if (status !== Status.Success || !invoices) {
      return <LoadingView status={ this.props.status } />;
    }

    return(
      <>
        <Table hover striped responsive>
          <TableHeader />
          <TableBody invoices={ invoices } />
        </Table>
        <SimplePaginator data={ this.props.pagination } />
      </>
    );
  }
}

const mapState = (state: IGlobalState) => ({
  orgId:      selectCurrentOrganizationId(state),
  status:     selectInvoicesStatus(state),
  invoices:   selectInvoices(state),
  pagination: selectInvoicesPagination(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number, params: object) => dispatch(loadInvoices(orgId, params)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(AllInvoices));
