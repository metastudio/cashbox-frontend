import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as QS from 'query-string';
import { Table } from 'react-bootstrap';

import { Invoice } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { loadInvoices } from 'actions/invoices.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectInvoices, selectInvoicesStatus } from 'selectors/invoices.js';

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

class AllInvoices extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load, location } = this.props;
    load(orgId, QS.parse(location.search));
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.location.search !== nextProps.location.search) {
      const { orgId, load, location } = this.props;
      load(orgId, QS.parse(location.search));
    }
  }

  render() {
    const { status, invoices, location: { search } } = this.props;

    if (status !== statuses.SUCCESS || !invoices) {
      return <LoadingView status={ this.props.status } />;
    }

    const queryParams = QS.parse(search);

    return(
      <Table hover striped responsive>
        <TableHeader unpaid={ false } s={ queryParams['q[s]'] } />
        <TableBody invoices={ invoices } />
      </Table>
    );
  }
}

const mapState = (state: {}) => ({
  orgId:    getCurrentOrganizationId(state),
  status:   selectInvoicesStatus(state),
  invoices: selectInvoices(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, params: object) => dispatch(loadInvoices(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(mapState, mapDispatch)(AllInvoices));
