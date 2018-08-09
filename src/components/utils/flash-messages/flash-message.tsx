import * as React from 'react';
import { Alert, Collapse } from 'react-bootstrap';

import { IFlashMessage } from 'services/flash-messages';

interface IProps {
  message:       IFlashMessage;
  onClose:       (m: IFlashMessage) => void;
  autoClose?:    boolean;
  closeTimeout?: number;
}

interface IState {
  shown: boolean;
  timer: number | null;
}

class FlashMessage extends React.Component<IProps, IState> {
  public state: IState = {
    shown: true,
    timer: null,
  };

  private closeMessage = () => {
    this.setState({ shown: false });
  }

  private handleClose = () => {
    const { onClose, message } = this.props;
    onClose(message);
  }

  private setAutoClose(props: IProps) {
    if (props.autoClose) {
      const timer = window.setTimeout(this.closeMessage, props.closeTimeout || 5000);
      this.setState({ timer });
    }
  }

  public componentDidMount() {
    this.setAutoClose(this.props);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.autoClose !== prevProps.autoClose) {
      this.setAutoClose(this.props);
    }
  }

  public componentWillUnmount() {
    if (this.state.timer) {
      window.clearTimeout(this.state.timer);
      this.setState({
        timer: null,
      });
    }
  }

  public render() {
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
