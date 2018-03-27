import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

import FormGroup from './horizontal-form-group.jsx';

export const HorizontalCurrencyInput = ({ label, field, ...inputProps }) => {
  return (
    <FormGroup field={ field } label={ label } >
      <CurrencyInput className="form-control" value={ field.value } onChange={ field.onChange } { ...inputProps } />
    </FormGroup>
  );
};

HorizontalCurrencyInput.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};
