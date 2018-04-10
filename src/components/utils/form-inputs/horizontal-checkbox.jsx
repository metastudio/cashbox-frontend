import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

import FormGroup from './horizontal-form-group.jsx';

const HorizontalCheckbox = ({ input, meta, label, ...inputProps }) => (
  <FormGroup input={ input } meta={ meta }>
    <Checkbox {...inputProps} {...input} checked={ input.value }>{ label }</Checkbox>
  </FormGroup>
);

HorizontalCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  meta:  PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export { HorizontalCheckbox };
