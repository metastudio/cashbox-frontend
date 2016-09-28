import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { restoreSession } from 'actions'

import Spinner from 'components/utils/spinner'

class App extends Component {

  componentDidMount() {
    this.props.restoreSession()
  }

  render() {
    if (!this.props.isSessionLoaded) {
      return <Spinner />
    } else {
      return this.props.children
    }
  }
}

App.propTypes = {
  isSessionLoaded: PropTypes.bool.isRequired,
  restoreSession:  PropTypes.func.isRequired,
  children:        React.PropTypes.node.isRequired,
}

const select = (state) => ({
  isSessionLoaded: state.app.isSessionLoaded
})

const dispatches = (dispatch) => ({
  restoreSession: () => dispatch(restoreSession()),
})

export default connect(select, dispatches)(App)
