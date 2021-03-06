import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import {
  createTransfer,
  ITransfer,
} from 'services/transactions';
import { formatDateValue } from 'utils/date';
import { prepareSubmissionError } from 'utils/errors';
import { formatMoneyParam, formatMoneyValue } from 'utils/money';
import { locationWithoutKey } from 'utils/url-helpers';

import TransferForm, { ITransferFormData } from './../forms/transfer';

interface IOwnProps {
  orgId:         ID;
  copyTransfer?: ITransfer;
}

interface IDispatchProps {
  create:      typeof createTransfer.request;
  showMessage: typeof addFlashMessage;
}

type IRouteProps = RouteComponentProps<{}>;
type IProps = IOwnProps & IDispatchProps & IRouteProps;

class NewTransfer extends React.PureComponent<IProps> {
  private handleSubmit = (values: ITransferFormData) => {
    const { orgId, create } = this.props;
    return new Promise((resolve, reject) => {
      create(
        orgId,
        {
          bankAccountId: values.fromBankAccountId,
          amount:        formatMoneyParam(values.fromAmount),
          referenceId:   values.toBankAccountId,
          exchangeRate:  formatMoneyParam(values.exchangeRate),
          comission:     formatMoneyParam(values.comission),
          comment:       values.comment,
          date:          values.date,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    const { showMessage, history, location: { search } } = this.props;
    showMessage('Transfer successfully created.');

    history.push(locationWithoutKey(
      {
        search,
        pathname: '/transactions',
      },
      'copyId',
    ));
  }

  private initialValues = (): ITransferFormData => {
    const { copyTransfer } = this.props;

    const values = {
      date: formatDateValue(new Date()),
    };

    if (!copyTransfer) {
      return values;
    }

    return ({
      ...values,
      toAmount:          formatMoneyValue(copyTransfer.amount),
      fromAmount:        formatMoneyValue(copyTransfer.transferOut.amount),
      toBankAccountId:   copyTransfer.bankAccount.id,
      fromBankAccountId: copyTransfer.transferOut.bankAccount.id,
    });
  }

  public render() {
    return(
      <TransferForm
        onSubmit={ this.handleSubmit }
        onSubmitSuccess={ this.afterCreate }
        action="Create"
        initialValues={ this.initialValues() }
      />
    );
  }
}

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  create:      (orgId, data, res, rej) => dispatch(createTransfer.request(orgId, data, res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default withRouter<IOwnProps & IRouteProps>(
  connect<{}, IDispatchProps, IOwnProps>(undefined, mapDispatch)(NewTransfer),
);
