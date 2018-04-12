import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js';
import { loadUnpaidInvoicesCount } from 'actions/invoices.js';
import { getCurrentOrganizationId } from 'selectors/organizations.js';
import { selectUnpaidInvoicesCountsStatus, selectUnpaidInvoicesCount } from 'selectors/invoices.js';

interface StateProps {
  orgId:  number;
  status: string;
  count:  number | null;
}

interface DispatchProps {
  load: (orgId: number) => void;
}

type Props = StateProps & DispatchProps;

class UnpaidInvoicesCountBadge extends React.Component<Props> {
  loadData(props: Props) {
    const { orgId, load } = this.props;

    load(orgId);
  }

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(props: Props) {
    if (this.props.status === statuses.INVALID) {
      this.loadData(this.props);
    }
  }

  render() {
    if (this.props.count === null) { return null; }

    return <Badge>{ this.props.count }</Badge>;
  }
}

const mapState = (state: {}) => ({
  orgId:  getCurrentOrganizationId(state),
  status: selectUnpaidInvoicesCountsStatus(state),
  count:  selectUnpaidInvoicesCount(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadUnpaidInvoicesCount(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(UnpaidInvoicesCountBadge);
