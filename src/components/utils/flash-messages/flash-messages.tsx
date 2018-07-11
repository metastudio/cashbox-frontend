import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { removeFlashMessage, selectFlashMessages, FlashMessage as FlashMessageType } from 'services/flash-messages';

import FlashMessage from './flash-message';

interface StateProps {
  messages: FlashMessageType[];
}

interface DispatchProps {
  removeMessage: (muid: string) => void;
}

const FlashMessages: React.SFC<StateProps & DispatchProps> = ({ messages, removeMessage }) => (
  <div id="flash_messages">
    {
      messages.map(message => (
        <FlashMessage
          key={ message.uid }
          message={ message }
          handleClose={ (m: FlashMessageType) => removeMessage(m.uid) }
          autoClose={ message.autoClose }
        />
      ))
    }
  </div>
);

const mapState = (state: object) => ({
  messages: selectFlashMessages(state),
});

const mapDispatch = (dispatch: Dispatch<void>) => ({
  removeMessage: (muid: string) => dispatch(removeFlashMessage(muid)),
});

export default connect<StateProps, DispatchProps>(mapState, mapDispatch)(FlashMessages);
