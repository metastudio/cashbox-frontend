import * as React from 'react';
import { Col, PageHeader, Panel, Row } from 'react-bootstrap';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID, Status } from 'model-types';
import {
  IBankAccount,
  loadBankAccount,
  selectBankAccount,
  selectBankAccountStatus,
  updateBankAccount,
} from 'services/bank-accounts';
import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import { selectCurrentOrganizationId } from 'services/organizations';
import { prepareSubmissionError } from 'utils/errors';

import LoadingView from 'components/utils/loading-view';
import Form, { IBankAccountFormData } from './form';

interface IStateProps {
  orgId:       ID;
  status:      Status;
  bankAccount: IBankAccount | null;
}

interface IDispatchProps {
  load:        typeof loadBankAccount.request;
  update:      typeof updateBankAccount.request;
  showMessage: typeof addFlashMessage;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{ id: string }>;

class EditBankAccount extends React.Component<IProps> {
  private handleSubmit = (values: IBankAccountFormData) => {
    const { orgId, bankAccount, update } = this.props;
    return new Promise((resolve, reject) => {
      update(
        orgId,
        bankAccount!.id,
        {
          name:           values.name,
          description:    values.description,
          invoiceDetails: values.invoiceDetails,
          currency:       values.currency,
          visible:        values.visible,
        },
        resolve,
        reject,
      );
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
          initialValues={ this.props.bankAccount || undefined }
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
        <BreadcrumbsItem to={ `/bank_accounts/${id}/edit` }>
          { `Edit Bank Account #${id}` }
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
  orgId:       selectCurrentOrganizationId(state)!, // TODO: orgId may be blank
  status:      selectBankAccountStatus(state),
  bankAccount: selectBankAccount(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  load:   (orgId, baId) => dispatch(loadBankAccount.request(orgId, baId)),
  update: (orgId, baId, data) => dispatch(updateBankAccount.request(orgId, baId, data)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditBankAccount));
