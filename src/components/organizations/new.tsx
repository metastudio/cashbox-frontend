import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { addFlashMessage } from 'services/flash-messages';
import {
  createOrganization,
  IOrganization,
  IOrganizationParams,
} from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import Form, { IOrganizationFormData } from './form';

interface IDispatchProps {
  create: (data: IOrganizationParams) => Promise<IOrganization>;
  showMessage: typeof addFlashMessage;
}

type IProps = IDispatchProps & RouteComponentProps<{}>;

class NewOrganization extends React.PureComponent<IProps> {
  private handleSubmit = (values: IOrganizationFormData) => {
    const { create } = this.props;
    return create({
      name:            values.name,
      defaultCurrency: values.defaultCurrency,
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { showMessage, history } = this.props;

    showMessage('Organization successfully created.');
    history.push('/organizations');
  }

  public render() {
    return(
      <>
        <BreadcrumbsItem to={ '/organizations/new' }>
          New
        </BreadcrumbsItem>
        <Row>
          <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 }>
            <PageHeader>New Organization</PageHeader>
            <Panel>
              <Panel.Body>
                <Form
                  onSubmit={ this.handleSubmit }
                  onSubmitSuccess={ this.afterCreate }
                  action="Create"
                />
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </>
    );
  }
}

const dispatcher = (dispatch: Dispatch): IDispatchProps => ({
  create:      data => new Promise((res, rej) => dispatch(createOrganization.request(data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect(null, dispatcher)(NewOrganization));
