import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import { removeFlashMessage } from 'actions'
import FlashMessage from './flash-message.jsx'

import './flash-messages.scss'

const FlashMessages = ({ messages, removeMessage }) => (
  <div id="flash_messages">
    <ReactCSSTransitionGroup transitionName="flash-messages" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      { messages.map(m => <FlashMessage key={ m.uid } message={ m } handleClose={ (m) => removeMessage(m.uid) } autoClose={ m.autoClose } /> ) }
    </ReactCSSTransitionGroup>
  </div>
)

FlashMessages.propTypes = {
  messages:      React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  removeMessage: React.PropTypes.func,
}

const select = (state) => ({
  messages: state.flashMessages.messages,
})

const dispatcher = (dispatch) => ({
  removeMessage: (muid) => dispatch(removeFlashMessage(muid)),
})

export default connect(select, dispatcher)(FlashMessages)
