import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addFlashMessage, FlashMessageOptions } from 'services/flash-messages';
import { selectHasCurrentOrganization } from 'services/organizations';

interface StateProps {
  hasOrganization: boolean;
}

interface DispatchProps {
  flashMessage: (msg: string, opts?: FlashMessageOptions) => void;
}

type Props = StateProps & DispatchProps;

class RequireOrganization extends React.Component<Props> {
  componentDidMount() {
    this.checkOrganization(this.props);
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
    const { hasOrganization, children } = this.props;
    if (hasOrganization) {
      return children;
    } else {
      return <Redirect to="/organizations/select" />;
    }
  }
}

const mapState = (state: object) => ({
  hasOrganization: selectHasCurrentOrganization(state),
});

const mapDispatch = (dispatch: Dispatch<{}>) => ({
  flashMessage: (msg: String, opts: FlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(RequireOrganization);
