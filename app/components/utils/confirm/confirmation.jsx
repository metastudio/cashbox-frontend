import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class Confirmation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: true,
    }

    this.handleDismiss = this.handleDismiss.bind(this)
    this.handleCancel  = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  hide(callback) {
    this.setState({
      show: false,
    }, callback)
  }

  handleDismiss() {
    this.hide(() => {
      this.props.dispose()
    })
  }

  handleCancel() {
    this.hide(() => {
      this.props.reject()
    })
  }

  handleConfirm() {
    this.hide(() => {
      this.props.resolve()
    })
  }

  render() {
    var header = null
    if (this.props.title) {
      header = (
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
      )
    }
    return (
      <div className="static-modal">
        <Modal bsSize="small" show={ this.state.show } onHide={ this.handleDismiss } backdrop={ true } keyboard={ true }>
          { header }
          <Modal.Body>
            {this.props.confirmation}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this.handleCancel }>{ this.props.cancelLabel }</Button>
            <Button bsStyle="primary" onClick={ this.handleConfirm }>{ this.props.okLabel }</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

Confirmation.propTypes = {
  okLabel:      React.PropTypes.string.isRequired,
  cancelLabel:  React.PropTypes.string.isRequired,
  confirmation: React.PropTypes.string.isRequired,
  title:        React.PropTypes.string,
  dispose:      React.PropTypes.func.isRequired,
  reject:       React.PropTypes.func.isRequired,
  resolve:      React.PropTypes.func.isRequired,
}

Confirmation.defaultProps = {
  okLabel:     'OK',
  cancelLabel: 'Cancel',
}
