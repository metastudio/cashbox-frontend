import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import {
  IOrganization, IOrganizationParams,
  updateOrganization,
} from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import Form, { IOrganizationFormData } from './form';
import Provider from './providers/organization';

interface IDispatchProps {
  update:  (orgId: ID, data: IOrganizationParams) => Promise<IOrganization>;
  message: typeof addFlashMessage;
}

type IProps = RouteComponentProps<{ id: string }> & IDispatchProps;

class EditOrganization extends React.PureComponent<IProps> {
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

  private renderForm = (org: IOrganization) => {
    return (
      <Form
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterUpdate }
        initialValues={ org }
        action="Update"
      />
    );
  }

  public render() {
    const { match: { params: { id } } } = this.props;

    return(
      <>
        <BreadcrumbsItem to={ `/organizations/${id}/edit` }>
          { `Edit Organization #${id}` }
        </BreadcrumbsItem>
        <Row>
          <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
            <PageHeader>Edit Organization</PageHeader>
            <Panel>
              <Panel.Body>
                <Provider orgId={ Number(id) }>
                  { this.renderForm }
                </Provider>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </>
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  update:  (orgId, data) => (
    new Promise((res, rej) => dispatch(updateOrganization.request(orgId, data, res, rej)))
  ),
  message: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<{}, IDispatchProps>(undefined, mapDispatch)(EditOrganization));
