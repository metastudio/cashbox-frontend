import * as React from 'react';
import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import {
  IBankAccount, IBankAccountParams,
  loadBankAccount,
  selectBankAccount,
  selectBankAccountStatus,
  updateBankAccount,
} from 'services/bank-accounts';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form, { IBankAccountFormData } from './form';

interface IStateProps {
  orgId:        ID;
  status:       Status;
  bankAccount?: IBankAccount;
}

interface IDispatchProps {
  load:   (orgId: ID, bankAccountId: ID) => void;
  update: (orgId: ID, bankAccountId: ID, data: IBankAccountParams) => Promise<IBankAccount>;
  showMessage: AddFlashMessageAction;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ id: string }>;

class EditBankAccount extends React.Component<IProps> {
  private handleSubmit = (values: IBankAccountFormData) => {
    const { orgId, bankAccount, update } = this.props;
    return update(orgId, bankAccount!.id, {
      name:           values.name,
      description:    values.description,
      invoiceDetails: values.invoiceDetails,
      currency:       values.currency,
      visible:        values.visible,
    }).catch(prepareSubmissionError);
  }

  private afterUpdate = () => {
    const { showMessage, history } = this.props;
    showMessage('Bank account successfully updated.');
    history.push('/bank_accounts');
  }

  private renderForm = () => (
    <Panel>
      <Panel.Body>
        <Form
          onSubmit={ this.handleSubmit }
          onSubmitSuccess={ this.afterUpdate }
          initialValues={ this.props.bankAccount }
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
    const { status, bankAccount } = this.props;

    if (status === Status.Invalid || !bankAccount) {
      return <LoadingView status={ status } />;
    }

    return(
      <>
        <BreadcrumbsItem to={ `/bank_accounts/${bankAccount.id}/edit` }>
          { `Edit Bank Account #${bankAccount.id}` }
        </BreadcrumbsItem>
        <Row>
          <Col xs={ 12 } smOffset={ 2 } sm={ 8 } mdOffset={ 3 } md={ 6 } >
            <PageHeader>Edit Bank Account</PageHeader>
            <LoadingView status={ status }>
              { this.renderForm }
            </LoadingView>
          </Col>
        </Row>
      </>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  orgId:       selectCurrentOrganizationId(state),
  status:      selectBankAccountStatus(state),
  bankAccount: selectBankAccount(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load:   (orgId, baId) => dispatch(loadBankAccount(orgId, baId)),
  update: (orgId, baId, data) => new Promise((res, rej) => dispatch(updateBankAccount(orgId, baId, data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditBankAccount));
