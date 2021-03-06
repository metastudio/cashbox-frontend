import * as React from 'react';

import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import {
  ICustomer,
  loadCustomer,
  selectCustomer, selectCustomerStatus,
  updateCustomer,
} from 'services/customers';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form, { ICustomerFormData } from './form';

interface IStateProps {
  orgId:    ID;
  status:   Status;
  customer: ICustomer | null;
}

interface IDispatchProps {
  load:        typeof loadCustomer.request;
  update:      typeof updateCustomer.request;
  showMessage: typeof addFlashMessage;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ id: string }>;

class EditCustomer extends React.Component<IProps> {
  private handleSubmit = (values: ICustomerFormData) => {
    const { orgId, customer, update } = this.props;
    return new Promise((resolve, reject) => {
      update(
        orgId,
        customer!.id,
        {
          name:           values.name,
          invoiceDetails: values.invoiceDetails,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { showMessage, history } = this.props;

    showMessage('Customer successfully updated.');
    history.push('/customers');
  }

  private renderForm = () => (
    <Panel>
      <Panel.Body>
        <Form
          onSubmit={ this.handleSubmit }
          onSubmitSuccess={ this.afterUpdate }
          initialValues={ this.props.customer || {} }
          action="Update"
        />
      </Panel.Body>
    </Panel>
  )

  public componentDidMount() {
    const { orgId, load, match: { params } } = this.props;
    load(orgId, Number(params.id));
  }

  public render() {
    const { status, match: { params: { id } } } = this.props;

    return(
      <>
        <BreadcrumbsItem to={ `/customers/${id}/edit` }>
          { `Edit Customer #${id}` }
        </BreadcrumbsItem>
        <Row>
          <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
            <PageHeader>Edit Customer</PageHeader>
            <LoadingView status={ status }>
              { () => this.renderForm() }
            </LoadingView>
          </Col>
        </Row>
      </>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:    selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  customer: selectCustomer(state),
  status:   selectCustomerStatus(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load:    (orgId, customerId) => dispatch(loadCustomer.request(orgId, customerId)),
  update:  (orgId, customerId, data, res, rej) => dispatch(updateCustomer.request(orgId, customerId, data, res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditCustomer));
