import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import * as QueryString from 'query-string';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Invoice } from 'model-types';
import * as statuses from 'constants/statuses.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { loadInvoices } from 'actions/invoices.js';
import {
  InvoiceRow,
  Navigation,
  TableHeader
} from './list_components';
import {
  selectInvoices,
  selectInvoicesStatus,
  selectInvoicesPagination,
  selectInvoicesUnpaidCount,
} from 'selectors/invoices.js';

import LoadingView from 'components/utils/loading-view';

interface StateProps {
  orgId:       number;
  status:      string;
  invoices:    Invoice[];
  unpaidCount: number;
}

interface DispatchProps {
  load: (orgId: number, params: object) => void;
}

type Props = RouteComponentProps<{}> & StateProps & DispatchProps;

class Invoices extends React.Component<Props> {
  componentDidMount() {
    const { orgId, load, location } = this.props;
    load(orgId, QueryString.parse(location.search));
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.location.search !== nextProps.location.search) {
      const { orgId, load, location } = this.props;
      load(orgId, QueryString.parse(location.search));
    }
  }

  render() {
    if (this.props.status !== statuses.SUCCESS) {
      return <LoadingView status={ this.props.status } />;
    }

    const queryParams = QueryString.parse(this.props.location.search);

    const invoices = this.props.invoices.map((invoice) => (
      <InvoiceRow invoice={ invoice } key={ invoice.id } />
    ));

    return(
      <div>
        <div className="page-header">
          <div className="pull-right">
            <LinkContainer to="/invoices/new">
              <Button bsStyle="success">New Invoice</Button>
            </LinkContainer>
          </div>
          <h1>Listing invoices</h1>
        </div>
        <Navigation unpaidCount={ this.props.unpaidCount } activeKey={ queryParams['q[unpaid]'] ? 2 : 1 } />
        <Table hover striped responsive>
          <thead>
            <TableHeader unpaid={ Boolean(queryParams['q[unpaid]']) } s={ queryParams['q[s]'] } />
          </thead>
          <tbody>
            { invoices }
          </tbody>
        </Table>
      </div>
    );
  }
}

const select = (state: {}) => ({
  orgId:       getCurrentOrganizationId(state),
  status:      selectInvoicesStatus(state),
  invoices:    selectInvoices(state),
  pagination:  selectInvoicesPagination(state),
  unpaidCount: selectInvoicesUnpaidCount(state),
});

const dispatcher = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number, params: object) => dispatch(loadInvoices(orgId, params)),
});

export default withRouter(connect<StateProps, DispatchProps>(select, dispatcher)(Invoices));
