import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';
import { Table } from 'react-bootstrap';

import { Status, Pagination as PaginationInterface } from 'model-types';
import {
  Invoice,
  loadInvoices,
  selectInvoices, selectInvoicesStatus, selectInvoicesPagination,
} from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import TableHeader from './table-header';
import TableBody from './table-body';
import Pagination from 'components/pagination';

interface StateProps {
  orgId:    number;
  status:   Status;
  invoices: Invoice[] | null;
  pagination: PaginationInterface;
}

interface DispatchProps {
  load: (orgId: number, params: object) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class AllInvoices extends React.Component<Props> {
  loadData = (props: Props) => {
    const { orgId, load, location: { search } } = props;
    load(orgId, QS.parse(search));
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    const { location: { search: prevSearch } } = prevProps;
    const { status, location: { search } } = this.props;

    if (status === Status.Invalid || search !== prevSearch) {
      this.loadData(this.props);
    }

  }

  render() {
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
  orgId:      selectCurrentOrganizationId(state),
  status:     selectInvoicesStatus(state),
  invoices:   selectInvoices(state),
  pagination: selectInvoicesPagination(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number, params: object) => dispatch(loadInvoices(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(AllInvoices));
