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

const mapState = (state: object): IStateProps => ({
  messages: selectFlashMessages(state),
});

const mapDispatch = (dispatch: Dispatch): IDispatchProps => ({
  removeMessage: (muid: string) => dispatch(removeFlashMessage(muid)),
});

export default connect<IStateProps, IDispatchProps>(mapState, mapDispatch)(FlashMessages);
