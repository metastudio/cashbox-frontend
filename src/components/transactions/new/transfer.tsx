import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { ID } from 'model-types';
import { addFlashMessage, AddFlashMessageAction } from 'services/flash-messages';
import {
  ITransfer, ITransferParams,
  createTransfer,
} from 'services/transactions';
import { selectCurrentOrganizationId } from 'services/organizations';
import { formatMoneyParam } from 'utils/money';
import { prepareSubmissionError } from 'utils/errors';

import TransferForm, { ITransferFormData } from './../forms/transfer';

interface IStateProps {
  orgId: ID;
}

interface IDispatchProps {
  create: (orgId: ID, data: ITransferParams) => Promise<ITransfer>;
  showMessage: AddFlashMessageAction;
}

type IProps = IStateProps & IDispatchProps & RouteComponentProps<{}>;

class NewTransfer extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransferFormData) => {
    const { orgId, create } = this.props;
    return create(orgId, {
      bankAccountId: values.bankAccountId,
      amount:        formatMoneyParam(values.amount),
      referenceId:   values.referenceId,
      exchangeRate:  values.exchangeRate,
      comission:     formatMoneyParam(values.comission),
      comment:       values.comment,
      date:          values.date,
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { showMessage, history } = this.props;
    showMessage('Transfer successfully created.');
    history.push('/transactions');
  }

  public render() {
    return(
      <TransferForm
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterCreate }
        action="Create"
      />
    );
  }
}

const mapState = (state: {}): IStateProps => ({
  orgId: selectCurrentOrganizationId(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create:  (orgId, data) => new Promise((res, rej) => dispatch(createTransfer(orgId, data, res, rej))),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter(connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(NewTransfer));
