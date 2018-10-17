import * as React from 'react';

import { Button, Modal } from 'react-bootstrap';

interface IConfirmationProps {
  okLabel?:     string;
  cancelLabel?: string;
  confirmation: string;
  title?:       string;
  dispose:      () => void;
  reject:       () => void;
  resolve:      () => void;
}

interface IState {
  show: boolean;
}

class Confirmation extends React.PureComponent<IConfirmationProps, IState> {
  public static defaultProps = {
    okLabel:     'OK',
    cancelLabel: 'Cancel',
  };

  public state = {
    show: true,
  };

  private hide = (callback: () => void) => {
    this.setState(
      { show: false },
      callback,
    );
  }

  private handleDismiss = () => {
    this.hide(() => this.props.dispose());
  }

  private handleCancel = () => {
    this.hide(() => this.props.reject());
  }

  private handleConfirm = () => {
    this.hide(() => this.props.resolve());
  }

  private renderHeader = (): React.ReactNode => {
    if (!this.props.title) { return null; }

    return (
      <Modal.Header>
        <Modal.Title>{ this.props.title }</Modal.Title>
      </Modal.Header>
    );
  }

  public render() {
    return (
      <div className="static-modal">
        <Modal
          bsSize="small"
          show={ this.state.show }
          onHide={ this.handleDismiss }
          backdrop
          keyboard
        >
          { this.renderHeader() }
          <Modal.Body>
            { this.props.confirmation }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this.handleCancel }>{ this.props.cancelLabel }</Button>
            <Button bsStyle="primary" onClick={ this.handleConfirm }>{ this.props.okLabel }</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export { Confirmation as default, IConfirmationProps };
