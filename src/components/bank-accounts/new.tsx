import * as React from 'react';
import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import {
  createBankAccount,
  IBankAccount,
  IBankAccountParams,
} from 'services/bank-accounts';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';
import Form, { IBankAccountFormData } from './form';

interface IStateProps {
  orgId: ID;
}

interface IDispatchProps {
  create: (orgId: ID, data: IBankAccountParams) => Promise<IBankAccount>;
  showMessage: AddFlashMessageAction;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{}>;

class NewBankAccount extends React.Component<IProps> {
  private handleSubmit = (values: IBankAccountFormData) => {
    const { orgId, create } = this.props;
    return create(orgId, {
      name:           values.name,
      description:    values.description,
      invoiceDetails: values.invoiceDetails,
      currency:       values.currency,
      visible:        values.visible,
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { showMessage, history } = this.props;
    showMessage('Bank account successfully created.');
    history.push('/bank_accounts');
  }

  public render() {
    return(
      <>
        <BreadcrumbsItem to={ '/bank_accounts/new' }>
          New
        </BreadcrumbsItem>
        <Row>
          <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
            <PageHeader>New Bank Account</PageHeader>
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
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create:      (orgId, data) => new Promise((res, rej) => dispatch(createBankAccount(orgId, data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewBankAccount));
