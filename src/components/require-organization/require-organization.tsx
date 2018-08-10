import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addFlashMessage, IFlashMessageOptions } from 'services/flash-messages';
import {
  restoreOrganization,
  selectIsOrganizationLoaded,
  selectHasCurrentOrganization,
} from 'services/organizations';
import Spinner from 'components/utils/spinner';

interface IStateProps {
  hasOrganization: boolean;
  isLoaded:        boolean;
}

interface IDispatchProps {
  restoreOrganization: () => void;
  flashMessage:        (msg: string, opts?: IFlashMessageOptions) => void;
}

type IProps = IStateProps & IDispatchProps;

class RequireOrganization extends React.Component<IProps> {
  private checkOrganization(props: IProps) {
    const { flashMessage, hasOrganization } = props;
    if (!hasOrganization) {
      flashMessage('Please select or add organization.', { type: 'info' });
    }
  }

  private checkOrganizationLoaded() {
    const { isLoaded } = this.props;

    if (!isLoaded) {
      this.props.restoreOrganization();
    } else {
      this.checkOrganization(this.props);
    }
  }

  public componentDidMount() {
    this.checkOrganizationLoaded();
  }

  public componentDidUpdate() {
    this.checkOrganizationLoaded();
  }

  public render() {
    const { isLoaded, hasOrganization, children } = this.props;

    if (!isLoaded) { return <Spinner />; }
    if (!hasOrganization) { return <Redirect to="/organizations/select" />; }

    return children;
  }
}

const mapState = (state: object) => ({
  isLoaded:        selectIsOrganizationLoaded(state),
  hasOrganization: selectHasCurrentOrganization(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  restoreOrganization: () => dispatch(restoreOrganization()),
  flashMessage:        (msg: string, opts: IFlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(RequireOrganization);
