import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import { wrapHorizontalFormSubmit } from './horizontal-form-submit.jsx';

const SubmitButton = ({ children, submitting, invalid, submitSucceeded, submitFailed, ...buttonProps }) => {
  let icon = '';
  let bsStyle = 'default';

  if (submitting) {
    icon = <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>;
  } else {
    if (submitSucceeded) {
      icon = <i className="fa fa-check" aria-hidden="true"></i>;
      bsStyle = 'success';
    } else if (submitFailed) {
      icon = <i className="fa fa-close" aria-hidden="true"></i>;
      bsStyle = 'danger';
    }
  }

  return (
    <Button type="submit" bsStyle={ bsStyle } disabled={ invalid || submitting } { ...buttonProps } >
      { icon }
      { icon && ' ' }
      { children }
    </Button>
  );
};

SubmitButton.propTypes = {
  children:        PropTypes.node,
  submitting:      PropTypes.bool.isRequired,
  invalid:         PropTypes.bool,
  submitFailed:    PropTypes.bool,
  submitSucceeded: PropTypes.bool,
};

SubmitButton.defaultProps = {
  submitting:      false,
  submitFailed:    false,
  submitSucceeded: false,
};

const HorizontalFormSubmitButton = wrapHorizontalFormSubmit(SubmitButton);

export { SubmitButton, HorizontalFormSubmitButton };
