import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Badge } from 'react-bootstrap';

import { Status } from 'model-types';
import {
  loadUnpaidInvoicesCount,
  selectUnpaidInvoicesCountsStatus, selectUnpaidInvoicesCount,
} from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

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

  componentDidUpdate() {
    if (this.props.status === Status.Invalid) {
      this.loadData(this.props);
    }
  }

  render() {
    if (this.props.status !== Status.Success || this.props.count === null) {
      return null;
    }

    return <Badge>{ this.props.count }</Badge>;
  }
}

const mapState = (state: {}) => ({
  orgId:  selectCurrentOrganizationId(state),
  status: selectUnpaidInvoicesCountsStatus(state),
  count:  selectUnpaidInvoicesCount(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  load: (orgId: number) => dispatch(loadUnpaidInvoicesCount(orgId)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(UnpaidInvoicesCountBadge);
