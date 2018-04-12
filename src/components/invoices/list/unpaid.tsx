import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';
import { Table } from 'react-bootstrap';

import { Invoice } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { loadUnpaidInvoices } from 'actions/invoices.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectUnpaidInvoices, selectUnpaidInvoicesStatus } from 'selectors/invoices.js';

import LoadingView from 'components/utils/loading-view';
import TableHeader from './table-header';
import TableBody from './table-body';

interface StateProps {
  orgId:    number;
  status:   string;
  invoices: Invoice[] | null;
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
      <Table hover striped responsive>
        <TableHeader />
        <TableBody invoices={ invoices } />
      </Table>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:    getCurrentOrganizationId(state),
  status:   selectUnpaidInvoicesStatus(state),
  invoices: selectUnpaidInvoices(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, params: object) => dispatch(loadUnpaidInvoices(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(UnpaidInvoices));
