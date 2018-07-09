import * as React from 'react';
import { Alert, Collapse } from 'react-bootstrap';

import { FlashMessage as FlashMessageType } from 'services/flash-messages';

interface Props {
  message:       FlashMessageType;
  handleClose:   (m: FlashMessageType) => void;
  autoClose?:    boolean;
  closeTimeout?: number;
}

interface State {
  shown: boolean;
  timer: number | null;
}

class FlashMessage extends React.Component<Props, State> {
  state: State = {
    shown: true,
    timer: null,
  };

  closeMessage = () => {
    this.setState({ shown: false });
  }

  handleClose = () => {
    const { handleClose, message } = this.props;
    handleClose(message);
  }

  setAutoClose(props: Props) {
    if (props.autoClose) {
      const timer = window.setTimeout(this.closeMessage, props.closeTimeout || 5000);
      this.setState({ timer });
    }
  }

  componentDidMount() {
    this.setAutoClose(this.props);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.autoClose !== prevProps.autoClose) {
      this.setAutoClose(this.props);
    }
  }

  componentWillUnmount() {
    if (this.state.timer) {
      window.clearTimeout(this.state.timer);
      this.setState({
        timer: null,
      });
    }
  }

  render() {
    const { message } = this.props;

    return(
      <Collapse in={ this.state.shown } onExited={ this.handleClose }>
        <Alert bsStyle={ message.type } onDismiss={ this.closeMessage } >
          { message.text }
        </Alert>
      </Collapse>
    );
  }
}

export { FlashMessage as default };
