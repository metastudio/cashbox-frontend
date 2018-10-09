import * as React from 'react';

import { ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { IOrganization, setCurrentOrganization } from 'services/organizations';

interface IOwnProps {
  organization: IOrganization;
}

interface IDispatchProps {
  setOrganization: (org: IOrganization) => Promise<IOrganization>;
  showMessage:     AddFlashMessageAction;
}

type IProps = IOwnProps & IDispatchProps & RouteComponentProps<{}>;

class OrganizationsListItem extends React.PureComponent<IProps> {
  private handleOrganizationClick = () => {
    const { organization, setOrganization } = this.props;

    setOrganization(organization).then((org) => {
      const { showMessage, history } = this.props;
      showMessage(`Organization ${org.name} selected.`);
      history.push('/');
    }).catch((e) => {
      this.props.showMessage(`Unable to select organization: ${e.message}`, { type: 'danger' });
    });
  }

  public render() {
    const { organization } = this.props;

    return (
      <ListGroupItem onClick={ this.handleOrganizationClick }>
        { organization.name } - { organization.defaultCurrency }
      </ListGroupItem>
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  setOrganization: org => new Promise((res, rej) => dispatch(setCurrentOrganization.request(org, res, rej))),
  showMessage:     msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(OrganizationsListItem));
