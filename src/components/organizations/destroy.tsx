import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { destroyOrganization, IOrganization } from 'services/organizations';

import { confirm } from 'components/utils/confirm';
import { FaButton } from '../utils/fa';

interface IOwnProps {
  organization: IOrganization;
}

interface IDispatchProps {
  destroy: (orgId: ID) => Promise<IOrganization>;
  message: AddFlashMessageAction;
}

type IRouteProps = IOwnProps & RouteComponentProps<{}>;
type IProps = IRouteProps & IDispatchProps;

class DestroyOrganization extends React.Component<IProps> {
  private handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { organization, message, history, destroy } = this.props;

    confirm(`Are you sure you want to remove organization "${organization.name}"?`).then(() => {
      destroy(organization.id).then((org) => {
        message(`Organization "${org.name}" has been removed.`);
        history.push('/organizations');
      }).catch((error) => {
        message(`Unable to remove organization: ${error.message}`, { type: 'danger' });
      });
    });
  }

  public render() {
    return (
      <FaButton
        onClick={ this.handleClick }
        icon="trash-o"
        title="Delete Organization"
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  destroy: orgId => new Promise((res, rej) => dispatch(destroyOrganization.request(orgId, res, rej))),
  message: (msg, type) => dispatch(addFlashMessage(msg, type)),
});

export default withRouter(connect<{}, IDispatchProps, IRouteProps>(undefined, mapDispatch)(DestroyOrganization));
