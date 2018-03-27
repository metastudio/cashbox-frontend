import React from 'react'
import PropTypes from 'prop-types';

const Spinner = ({ title }) => (
  <span className="spinner">
    <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
    &nbsp;{ title }
  </span>
)

Spinner.propTypes = {
  title: PropTypes.string,
}
Spinner.defaultProps = {
  title: 'Loading...'
}

export default Spinner
