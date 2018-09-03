import * as React from 'react';

import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { IPagination, Status } from 'model-types';
import {
  IInvoice,
  loadUnpaidInvoices,
  selectUnpaidInvoices,
  selectUnpaidInvoicesPagination,
  selectUnpaidInvoicesStatus,
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

type IProps = RouteComponentProps<{}> & IStateProps & IDispatchProps;

class UnpaidInvoices extends React.Component<IProps> {
  private loadData = (props: IProps) => {
    const { orgId, load, location: { search } } = props;
    load(orgId, parseQuery(search));
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
        <SimplePaginator data={ this.props.pagination } />
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
