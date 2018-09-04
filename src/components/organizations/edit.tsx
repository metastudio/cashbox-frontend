import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import {
  IOrganization, IOrganizationParams,
  loadOrganization,
  selectOrganization, selectOrganizationStatus,
  updateOrganization,
} from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form, { IOrganizationFormData } from './form';

interface IStateProps {
  status: Status;
  org:    IOrganization | null;
}

interface IDispatchProps {
  load:    (orgId: ID) => void;
  update:  (orgId: ID, data: IOrganizationParams) => Promise<IOrganization>;
  message: AddFlashMessageAction;
}

type IProps = RouteComponentProps<{ id: string }> & IStateProps & IDispatchProps;

class EditOrganization extends React.PureComponent<IProps> {
  private loadData = () => {
    const { load, match: { params: { id } } } = this.props;

    load(Number(id));
  }

  private handleSubmit = (values: IOrganizationFormData) => {
    const { update, match: { params: { id } } } = this.props;
    return update(
      Number(id),
      {
        name:            values.name,
        defaultCurrency: values.defaultCurrency,
      },
    ).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { message, history } = this.props;

    message('Organization has been updated.');
    history.push('/organizations');
  }

  public componentDidMount() {
    this.loadData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { status, match: { params: { id } } } = this.props;

    if (status === Status.Invalid || id !== prevId) {
      this.loadData();
    }
  }

  public render() {
    const { status, org } = this.props;

    if (status === Status.Invalid || !org) {
      return <LoadingView status={ status } />;
    }

    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>Edit Organization</PageHeader>
          <Panel>
            <Panel.Body>
              <Form
                onSubmit={ this.handleSubmit }
                onSubmitSuccess={ this.afterUpdate }
                initialValues={ org }
                action="Update"
              />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  status: selectOrganizationStatus(state),
  org:    selectOrganization(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load:    orgId => dispatch(loadOrganization(orgId)),
  update:  (orgId, data) => (
    new Promise((res, rej) => dispatch(updateOrganization(orgId, data, res, rej)))
  ),
  message: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditOrganization));
