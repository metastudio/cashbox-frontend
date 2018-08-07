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
  hasOrganization: boolean;
  isLoaded:        boolean;
}

interface DispatchProps {
  restoreOrganization: () => void;
  flashMessage:        (msg: string, opts?: FlashMessageOptions) => void;
}

type Props = StateProps & DispatchProps;

class RequireOrganization extends React.Component<Props> {
  componentDidMount() {
    const { isLoaded } = this.props;

    if (!isLoaded) {
      this.props.restoreOrganization();
    } else {
      this.checkOrganization(this.props);
    }
  }

  checkOrganization(props: Props) {
    const { flashMessage, hasOrganization } = props;
    if (!hasOrganization) {
      flashMessage('Please select or add organization.', { type: 'info' });
    }
  }

  render() {
    const { isLoaded, hasOrganization, children } = this.props;

    if (!isLoaded) {
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
  isLoaded:        selectIsOrganizationLoaded(state),
  hasOrganization: selectHasCurrentOrganization(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  restoreOrganization: () => dispatch(restoreOrganization()),
  flashMessage:        (msg: String, opts: FlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(RequireOrganization);
