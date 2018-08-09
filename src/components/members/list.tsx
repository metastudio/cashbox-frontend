import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { PageHeader } from 'react-bootstrap';

import { ID, Status } from 'model-types';
import {
  IMember,
  loadMembers,
  selectMembersStatus, selectMembers,
} from 'services/members';
import { selectCurrentOrganizationId } from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import Table from './list/table';

interface IStateProps {
  orgId:   ID;
  status:  Status;
  members: IMember[];
}

interface IDispatchProps {
  load: (orgId: ID) => void;
}

type IProps = IStateProps & IDispatchProps;

class MembersList extends React.PureComponent<IProps> {
  private loadData = () => {
    const { orgId, load } = this.props;
    load(orgId);
  }
  private renderMembers = () => {
    const { members } = this.props;

    return <Table members={ members } />;
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate() {
    if (this.props.status === Status.Invalid) {
      this.loadData();
    }
  }

  public render() {
    return (
      <>
        <PageHeader>Members</PageHeader>
        <LoadingView status={ this.props.status }>
          { this.renderMembers }
        </LoadingView>
      </>
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  orgId:   selectCurrentOrganizationId(state),
  status:  selectMembersStatus(state),
  members: selectMembers(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: orgId => dispatch(loadMembers(orgId)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(MembersList);
