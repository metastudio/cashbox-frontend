import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Panel, Row, Col, PageHeader } from 'react-bootstrap';

import { ID, Status } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  ICustomer,
  loadCustomer, updateCustomer,
  selectCustomerStatus, selectCustomer, ICustomerParams,
} from 'services/customers';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form, { ICustomerFormData } from './form';

interface IStateProps {
  orgId:     ID;
  status:    Status;
  customer?: ICustomer;
}

interface IDispatchProps {
  load:        (orgId: ID, customerId: ID) => void;
  update:      (orgId: ID, customerID: ID, data: ICustomerParams) => Promise<void>;
  showMessage: AddFlashMessageAction;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ id: string }>;

class EditCustomer extends React.Component<IProps> {
  private handleSubmit = (values: ICustomerFormData) => {
    const { orgId, customer, update } = this.props;
    return update(orgId, customer!.id, {
      name:           values.name,
      invoiceDetails: values.invoiceDetails,
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
          initialValues={ this.props.customer }
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
    const { status } = this.props;

    return(
      <Row>
        <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
          <PageHeader>Edit Customer</PageHeader>
          <LoadingView status={ status }>
            { () => this.renderForm() }
          </LoadingView>
        </Col>
      </Row>
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  orgId:    selectCurrentOrganizationId(state),
  customer: selectCustomer(state),
  status:   selectCustomerStatus(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load:    (orgId, customerId) => dispatch(loadCustomer(orgId, customerId)),
  update:  (orgId, customerId, data) => (
    new Promise((res, rej) => dispatch(updateCustomer(orgId, customerId, data, res, rej)))
  ),
  showMessage: (message, type) => dispatch(addFlashMessage(message, type)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditCustomer));
