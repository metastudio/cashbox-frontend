import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';
import { Table } from 'react-bootstrap';

import { Status, Pagination as PaginationInterface } from 'model-types';
import {
  Invoice,
  loadUnpaidInvoices,
  selectUnpaidInvoices, selectUnpaidInvoicesStatus, selectUnpaidInvoicesPagination,
} from 'services/invoices';
import { getCurrentOrganizationId } from 'selectors/organizations.js';

import LoadingView from 'components/utils/loading-view';
import TableHeader from './table-header';
import TableBody from './table-body';
import Pagination from 'components/pagination';

interface StateProps {
  orgId:    number;
  status:   string;
  invoices: Invoice[] | null;
  pagination: PaginationInterface;
}

interface DispatchProps {
  load: (orgId: number, params: object) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class UnpaidInvoices extends React.Component<Props> {
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
  orgId:    getCurrentOrganizationId(state),
  status:   selectUnpaidInvoicesStatus(state),
  invoices: selectUnpaidInvoices(state),
  pagination: selectUnpaidInvoicesPagination(state)
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, params: object) => dispatch(loadUnpaidInvoices(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(UnpaidInvoices));
