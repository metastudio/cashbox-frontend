import * as React from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  IFlashMessage,
  removeFlashMessage,
  selectFlashMessages,
} from 'services/flash-messages';
import { IGlobalState } from 'services/global-state';

import FlashMessage from './flash-message';

interface IStateProps {
  messages: IFlashMessage[];
}

interface IDispatchProps {
  removeMessage: typeof removeFlashMessage;
}

type IProps = IStateProps & IDispatchProps;

class FlashMessages extends React.PureComponent<IProps> {
  private handleClose = (m: IFlashMessage) => {
    this.props.removeMessage(m.uid);
  }

  private renderMessage = (m: IFlashMessage) => (
    <FlashMessage
      key={ m.uid }
      message={ m }
      onClose={ this.handleClose }
      autoClose={ m.autoClose }
    />
  )

  public render() {
    const { messages } = this.props;

    return (
      <div id="flash_messages">
        { messages.map(this.renderMessage) }
      </div>
    );
  }
}

const mapState = (state: IGlobalState): IStateProps => ({
  messages: selectFlashMessages(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  removeMessage: muid => dispatch(removeFlashMessage(muid)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(FlashMessages);
