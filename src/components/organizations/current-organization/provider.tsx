import * as React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';

import { addFlashMessage, IFlashMessageOptions } from 'services/flash-messages';
import {
  IOrganization,
  restoreOrganization,
  selectCurrentOrganization,
  selectIsOrganizationLoaded,
} from 'services/organizations';
import Context from './context';

import Spinner from 'components/utils/spinner';

interface IStateProps {
  isLoaded:     boolean;
  organization: IOrganization;
}

interface IDispatchProps {
  restoreOrganization: () => void;
  flashMessage:        (msg: string, opts?: IFlashMessageOptions) => void;
}

type IProps = IStateProps & IDispatchProps;

class CurrentOrganizationProvider extends React.Component<IProps> {
  private checkOrganization() {
    const { isLoaded, organization, flashMessage } = this.props;

    if (!isLoaded) {
      this.props.restoreOrganization();
      return;
    }

    if (!organization) {
      flashMessage('Please select or add organization.', { type: 'info' });
    }
  }

  public componentDidMount() {
    this.checkOrganization();
  }

  public componentDidUpdate() {
    this.checkOrganization();
  }

  public render() {
    const { isLoaded, organization, children } = this.props;

    if (!isLoaded) { return <Spinner />; }
    if (!organization) { return <Redirect to="/organizations/select" />; }

    return (
      <Context.Provider value={ { organization, orgId: organization.id } }>
        { children }
      </Context.Provider>
    );
  }
}

const mapState = (state: object): IStateProps => ({
  isLoaded:     selectIsOrganizationLoaded(state),
  organization: selectCurrentOrganization(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  restoreOrganization: () => dispatch(restoreOrganization()),
  flashMessage:        (msg: string, opts: IFlashMessageOptions) => dispatch(addFlashMessage(msg, opts)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(CurrentOrganizationProvider);
