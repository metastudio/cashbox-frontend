import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

import * as statuses from 'constants/statuses.js'

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
  status:     PropTypes.string.isRequired,
  error:      PropTypes.string.isRequired,
  onTryAgain: PropTypes.func,
  children:   PropTypes.node.isRequired,
}

LoadingView.defaultProps = {
  error: 'Error on data loading.'
}

export default LoadingView
