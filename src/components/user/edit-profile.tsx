import * as React from 'react';

import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addFlashMessage } from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';
import {
  IUser,
  selectCurrentUser,
  updateProfile,
} from 'services/users';
import { prepareSubmissionError } from 'utils/errors';

import ProfileForm, { IProfileFormData } from './profile-form';

interface IStateProps {
  user:   IUser | null;
}

interface IDispatchProps {
  showMessage: typeof addFlashMessage;
  update:      typeof updateProfile.request;
}

type IProps = IStateProps & IDispatchProps;

class EditProfile extends React.PureComponent<IProps> {
  private handleSubmit = (values: IProfileFormData) => {
    const { user, update } = this.props;
    if (!user) { return; }

    return new Promise((resolve, reject) => {
      update(
        user.id,
        {
          fullName: values.fullName,
          profileAttributes: { phoneNumber: values.profile && values.profile.phoneNumber },
        },
        resolve,
        reject,
      );
    }).catch(prepareSubmissionError);
  }

  private afterCreate = () => {
    this.props.showMessage('Profile successfully updated.');
  }

  private initialValues = (): IProfileFormData => {
    const { user } = this.props;
    if (!user) { return {}; }

    return {
      fullName: user.fullName,
      profile: {
        phoneNumber: user.phoneNumber,
      },
    };
  }

  public render() {
    return(
      <Panel>
        <Panel.Heading>Profile:</Panel.Heading>
        <Panel.Body>
          <ProfileForm
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
  update:      (userId, data, res, rej) => dispatch(updateProfile.request(userId, data, res, rej)),
  showMessage: msg => dispatch(addFlashMessage(msg)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(EditProfile);
