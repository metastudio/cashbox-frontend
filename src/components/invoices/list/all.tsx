import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';
import { Table } from 'react-bootstrap';

import { Invoice, Pagination as PaginationInterface } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { loadInvoices } from 'actions/invoices.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectInvoices, selectInvoicesStatus, selectInvoicesPagination } from 'selectors/invoices.js';

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

class AllInvoices extends React.Component<Props> {
  loadData = (props: Props) => {
    const { orgId, load, location: { search } } = props;
    load(orgId, QS.parse(search));
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { status, location: { search: nextSearch } } = nextProps;
    const { location: { search: oldSearch } } = this.props;

    if (status === statuses.INVALID || oldSearch !== nextSearch) {
      this.loadData(nextProps);
    }
  }

  render() {
    const { status, invoices } = this.props;

    if (status !== statuses.SUCCESS || !invoices) {
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
  orgId:      getCurrentOrganizationId(state),
  status:     selectInvoicesStatus(state),
  invoices:   selectInvoices(state),
  pagination: selectInvoicesPagination(state)
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, params: object) => dispatch(loadInvoices(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(AllInvoices));
