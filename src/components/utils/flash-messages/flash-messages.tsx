import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { removeFlashMessage } from 'actions/flash-messages.js';
import { selectFlashMessages } from 'selectors/flash-messages.js';

import FlashMessage, { Message } from './flash-message';

interface StateProps {
  messages: Message[];
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
          handleClose={ (m: Message) => removeMessage(m.uid) }
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
