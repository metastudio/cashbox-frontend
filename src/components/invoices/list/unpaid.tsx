import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';
import { Table } from 'react-bootstrap';

import { Status, IPagination } from 'model-types';
import {
  Invoice,
  loadUnpaidInvoices,
  selectUnpaidInvoices, selectUnpaidInvoicesStatus, selectUnpaidInvoicesPagination,
} from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import TableHeader from './table-header';
import TableBody from './table-body';
import Pagination from 'components/pagination';

interface IStateProps {
  orgId:      number;
  status:     Status;
  invoices:   Invoice[] | null;
  pagination: IPagination;
}

interface IDispatchProps {
  load: (orgId: number, params: object) => void;
}

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class UnpaidInvoices extends React.Component<IProps> {
  private loadData = (props: IProps) => {
    const { orgId, load, location: { search } } = props;
    load(orgId, QS.parse(search));
  }

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate(prevProps: IProps) {
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
        <Pagination data={ this.props.pagination } />
      </>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:    selectCurrentOrganizationId(state),
  status:   selectUnpaidInvoicesStatus(state),
  invoices: selectUnpaidInvoices(state),
  pagination: selectUnpaidInvoicesPagination(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number, params: object) => dispatch(loadUnpaidInvoices(orgId, params)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(UnpaidInvoices));
