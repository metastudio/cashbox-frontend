import * as React from 'react';

import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { ID } from 'model-types';
import { addFlashMessage } from 'services/flash-messages';
import { cancelAccount, selectCurrentUserId } from 'services/users';

import { confirm } from 'components/utils/confirm';
import { IGlobalState } from 'services/global-state';

interface IStateProps {
  userId: ID | null;
}

interface IDispatchProps {
  cancel:      typeof cancelAccount.request;
  showMessage: typeof addFlashMessage;
}

type IProps = IStateProps & IDispatchProps;

class CancelAccount extends React.PureComponent<IProps> {
  private handleClick = (e: React.MouseEvent<Button>) => {
    e.preventDefault();

    confirm('Are you sure you want to cancel your account? It can\'t be undone').then(() => {
      const { userId, cancel } = this.props;
      if (!userId) { return; }

      new Promise((resolve, reject) => {
        cancel(userId);
      }).then(() => {
        this.props.showMessage('Account has been canceled.');
      }).catch((error) => {
        this.props.showMessage(error.message, { type: 'danger' });
      });
    });
  }

  public render() {
    return(
      <div style={ { marginBottom: '20px' } }>
        <h3>Cancel my account</h3>
        <div>
          Unhappy?&nbsp;
          <Button bsStyle="link" onClick={ this.handleClick }>Cancel my account</Button>
        </div>
      </div>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  userId: selectCurrentUserId(state),
});

const mapDisaptch = (dispatch: Dispatch): IDispatchProps => ({
  cancel:      (userId, res, rej) => dispatch(cancelAccount.request(userId, res, rej)),
  showMessage: (msg, type) => dispatch(addFlashMessage(msg, type)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDisaptch)(CancelAccount);
