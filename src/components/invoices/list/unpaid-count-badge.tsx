import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Badge } from 'react-bootstrap';

import { Status } from 'model-types';
import {
  loadUnpaidInvoicesCount,
  selectUnpaidInvoicesCountsStatus, selectUnpaidInvoicesCount,
} from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

interface IStateProps {
  orgId:  number;
  status: string;
  count:  number | null;
}

interface IDispatchProps {
  load: (orgId: number) => void;
}

type IProps = IStateProps & IDispatchProps;

class UnpaidInvoicesCountBadge extends React.Component<IProps> {
  private loadData(props: IProps) {
    const { orgId, load } = this.props;

    load(orgId);
  }

  public componentDidMount() {
    this.loadData(this.props);
  }

  public componentDidUpdate() {
    if (this.props.status === Status.Invalid) {
      this.loadData(this.props);
    }
  }

  public render() {
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

const mapDispatch = (dispatch: Dispatch) => ({
  load: (orgId: number) => dispatch(loadUnpaidInvoicesCount(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(UnpaidInvoicesCountBadge);
