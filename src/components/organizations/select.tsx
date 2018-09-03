import * as React from 'react';

import { Button, Col, ListGroup, PageHeader, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Status } from 'model-types';
import {
  IOrganization,
  loadOrganizations,
  selectOrganizations,
  selectOrganizationsStatus,
} from 'services/organizations';

import LoadingView from 'components/utils/loading-view';
import ListItem from './list/list-item';

interface IStateProps {
  status: Status;
  organizations: IOrganization[];
}

interface IDispatchProps {
  load: () => void;
}

type IProps = IStateProps & IDispatchProps;

class SelectOrganization extends React.PureComponent<IProps> {
  private loadData = () => {
    this.props.load();
  }

  private renderOrganizations = () => {
    const { organizations } = this.props;

    return (
      <Panel>
        <ListGroup id="organizations">
          { organizations.map(o => <ListItem organization={ o } key={ o.id } />) }
        </ListGroup>
      </Panel>
    );
  }

  private renderContent = () => {
    return (
      <>
        { this.renderOrganizations() }
        <p className="text-center">or</p>
        <p className="text-center">
          <Button bsStyle="primary" href="/organizations/new">Create a new Organization</Button>
        </p>
      </>
    );
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
    const { status } = this.props;

    return (
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 }>
          <PageHeader>Select organization</PageHeader>
          <LoadingView status={ status }>
            { this.renderContent  }
          </LoadingView>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  organizations: selectOrganizations(state),
  status:        selectOrganizationsStatus(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load: () => dispatch(loadOrganizations()),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(SelectOrganization);
