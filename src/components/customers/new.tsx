import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { createCustomer } from 'services/customers';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import Form, { ICustomerFormData } from './form';

interface IStateProps {
  orgId: ID;
}

interface IDispatchProps {
  create:      typeof createCustomer.request;
  showMessage: typeof addFlashMessage;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{}>;

class NewCustomer extends React.Component<IProps> {
  private handleSubmit = (values: ICustomerFormData) => {
    const { orgId, create } = this.props;
    return new Promise((resolve, reject) => {
      create(
        orgId,
        {
          name:           values.name,
          invoiceDetails: values.invoiceDetails,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { showMessage, history } = this.props;
    showMessage('Customer successfully created.');
    history.push('/customers');
  }

  public render() {
    return(
      <>
        <BreadcrumbsItem to={ '/customers/new' }>
          New
        </BreadcrumbsItem>
        <Row>
          <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
            <PageHeader>New Customer</PageHeader>
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

const mapState = (state: IGlobalState): IStateProps => ({
  orgId: selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create:      (orgId, data, res, rej) => dispatch(createCustomer.request(orgId, data, res, rej)),
  showMessage: (msg, opts)   => dispatch(addFlashMessage(msg, opts)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewCustomer));
