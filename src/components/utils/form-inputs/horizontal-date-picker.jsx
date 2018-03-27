import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import FormGroup from './horizontal-form-group.jsx';

import 'react-datepicker/dist/react-datepicker.css';

const HorizontalDatePicker = ({ label, field, ...inputProps }) => {
  const handleChange = (date) => {
    field.onChange(moment(date).toDate());
  };

  return (
    <FormGroup field={ field } label={ label } >
      <DatePicker dateForm="DD/MM/YYYY" selected={ field.value ? moment(field.value) : null } onChange={ handleChange } { ...inputProps } />
    </FormGroup>
  );
};

HorizontalDatePicker.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export { HorizontalDatePicker };
