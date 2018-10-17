import * as React from 'react';

import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import {
  IUser,
  selectCurrentUser,
  updateAccount,
} from 'services/users';
import { prepareSubmissionError } from 'utils/errors';

import AccountForm, { IAccountFormData } from './account-form';

interface IStateProps {
  user: IUser | null;
}

interface IDispatchProps {
  update:      typeof updateAccount.request;
  showMessage: typeof addFlashMessage;
}

type IProps = IStateProps & IDispatchProps;

class EditAccount extends React.PureComponent<IProps> {
  private handleSubmit = (values: IAccountFormData) => {
    const { user, update } = this.props;
    if (!user) { return; }

    return new Promise((resolve, reject) => {
      update(
        user.id,
        {
          email: values.email,
          currentPassword: values.currentPassword,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    this.props.showMessage('Account successfully updated.');
  }

  private initialValues = (): IAccountFormData => {
    const { user } = this.props;
    if (!user) { return {}; }

    return {
      email: user.email,
    };
  }

  public render() {
    return(
      <Panel>
        <Panel.Heading>Account Settings:</Panel.Heading>
        <Panel.Body>
          <AccountForm
            onSubmit={ this.handleSubmit }
            onSubmitSuccess={ this.afterCreate }
            initialValues={ this.initialValues() }
          />
        </Panel.Body>
      </Panel>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  user: selectCurrentUser(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  update:      (userId, data, res, rej) => dispatch(updateAccount.request(userId, data, res, rej)),
  showMessage: (msg, type) => dispatch(addFlashMessage(msg, type)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditAccount);
