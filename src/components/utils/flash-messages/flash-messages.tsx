import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import {
  IFlashMessage,
  removeFlashMessage,
  selectFlashMessages,
} from 'services/flash-messages';

import FlashMessage from './flash-message';

interface IStateProps {
  messages: IFlashMessage[];
}

interface IDispatchProps {
  removeMessage: (muid: string) => void;
}

type IProps = IStateProps & IDispatchProps;

const FlashMessages: React.SFC<IProps> = ({ messages, removeMessage }) => {
  const message = (m: IFlashMessage): React.ReactNode => (
    <FlashMessage
      key={ m.uid }
      message={ m }
      handleClose={ (m: IFlashMessage) => removeMessage(m.uid) }
      autoClose={ m.autoClose }
    />
  );

  return (
    <div id="flash_messages">
      { messages.map(message) }
    </div>
  );
};

const mapState = (state: object) => ({
  messages: selectFlashMessages(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  removeMessage: (muid: string) => dispatch(removeFlashMessage(muid)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(FlashMessages);
