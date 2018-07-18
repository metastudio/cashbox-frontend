import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addFlashMessage, FlashMessageOptions } from 'services/flash-messages';
import {
  restoreOrganization,
  selectIsOrganizationLoaded,
  selectHasCurrentOrganization,
} from 'services/organizations';
import Spinner from 'components/utils/spinner';

interface StateProps {
  hasOrganization:      boolean;
  isOrganizationLoaded: boolean;
}

interface DispatchProps {
  restoreOrganization: () => void;
  flashMessage:        (msg: string, opts?: FlashMessageOptions) => void;
}

type Props = StateProps & DispatchProps;

class RequireOrganization extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.hasOrganization) {
      this.props.restoreOrganization();
      this.checkOrganization(this.props);
    }
  }

  componentDidUpdate() {
    this.checkOrganization(this.props);
  }

  checkOrganization(props: Props) {
    const { flashMessage, hasOrganization } = props;
    if (!hasOrganization) {
      flashMessage('Please select or add organization.', { type: 'info' });
    }
  }

  render() {
    const { isOrganizationLoaded, hasOrganization, children } = this.props;

    if (isOrganizationLoaded) {
      return <Spinner />;
    }

    if (hasOrganization) {
      return children;
    } else {
      return <Redirect to="/organizations/select" />;
    }
  }
}

const mapState = (state: object) => ({
  isOrganizationLoaded: selectIsOrganizationLoaded(state),
  hasOrganization:      selectHasCurrentOrganization(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  restoreOrganization: () => dispatch(restoreOrganization()),
  flashMessage:        (msg: String, opts: FlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(RequireOrganization);
