import React from 'react'
import { Alert } from 'react-bootstrap'

import * as statuses from 'constants/statuses'

import Spinner from 'components/utils/spinner'

const LoadingView = ({status, error, onTryAgain, children}) => {
  let body = null
  switch (status) {
    case statuses.FAILURE:
      body = (
        <Alert bsStyle="danger">
          { error || 'Error on data loading.' }
          { ' ' }
          { onTryAgain && <a href="" onClick={ (e) => { e.preventDefault(); onTryAgain() } }>Try again</a> }
        </Alert>
      )
      break
    case statuses.SUCCESS:
      body = children
      break
    default:
      body = <Spinner />
  }

  return (
    <div>
      { body }
    </div>
  )
}

LoadingView.propTypes = {
  status:     React.PropTypes.string.isRequired,
  error:      React.PropTypes.string.isRequired,
  onTryAgain: React.PropTypes.func,
  children:   React.PropTypes.node.isRequired,
}

LoadingView.defaultProps = {
  error: 'Error on data loading.'
}

export default LoadingView
