import React from 'react'

import { Alert } from 'react-bootstrap'

export default class FlashMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  handleClose() {
    this.props.handleClose(this.props.message)
  }

  setAutoClose(props) {
    if (props.autoClose) {
      var timer = window.setTimeout(() => props.handleClose(props.message), props.closeTimeout || 5000)
      this.setState({
        timer: timer,
      })
    }
  }

  componentDidMount() {
    this.setAutoClose(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setAutoClose(nextProps)
  }

  componentWillUnmount() {
    if (this.state.timer) {
      window.clearTimeout(this.state.timer)
      this.setState({
        timer: null,
      })
    }
  }

  render() {
    return(
      <Alert bsStyle={ this.props.message.type } onDismiss={  () => this.handleClose() } >
        { this.props.message.text }
      </Alert>
    )
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  handleClose: React.PropTypes.func.isRequired,
  autoClose: React.PropTypes.bool,
  closeTimeout: React.PropTypes.number
}
