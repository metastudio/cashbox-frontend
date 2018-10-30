import * as React from 'react';

import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { IGlobalState } from 'services/global-state';
import {
  loadUnpaidInvoicesCount,
  selectUnpaidInvoicesCount, selectUnpaidInvoicesCountStatus,
} from 'services/invoices';
import { selectCurrentOrganizationId } from 'services/organizations';

interface IStateProps {
  orgId:  ID;
  status: Status;
  count:  number | null;
}

interface IDispatchProps {
  load: typeof loadUnpaidInvoicesCount.request;
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

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:  selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  status: selectUnpaidInvoicesCountStatus(state),
  count:  selectUnpaidInvoicesCount(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadUnpaidInvoicesCount.request(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(UnpaidInvoicesCountBadge);
