import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const InlineFormGroup = ({ input, meta, label, labelProps, children, ...groupProps }) => {
  const error = Array.isArray(meta.error) ? meta.error.join(', ') : meta.error;

  return (
    <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null } {...groupProps} >
      <ControlLabel {...labelProps} >{ label }</ControlLabel>
      { ' ' }
      { children }
      { meta.invalid && <HelpBlock>{ error }</HelpBlock> }
    </FormGroup>
  );
};

InlineFormGroup.propTypes = {
  input: PropTypes.shape({
    name:    PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    error:   PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  }).isRequired,
  label:      PropTypes.string,
  labelProps: PropTypes.object,
  children:   PropTypes.node.isRequired,
};

const wrapInlineFormGroup = (Component, groupProps = {}) => {
  class InlineFormGroupWrapper extends React.Component {
    render() {
      const { input, meta, label, labelProps, ...props } = this.props;

      return (
        <InlineFormGroup input={ input } meta={ meta } label={ label } labelProps={ labelProps } { ...groupProps } >
          <Component input={ input } meta={ meta } {...props} />
        </InlineFormGroup>
      );
    }
  }

  InlineFormGroupWrapper.propTypes = {
    input:      PropTypes.object.isRequired,
    meta:       PropTypes.object.isRequired,
    label:      PropTypes.string,
    labelProps: PropTypes.object,
  };

  InlineFormGroupWrapper.displayName = `InlineFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

  return InlineFormGroupWrapper;
};

export { InlineFormGroup as default, wrapInlineFormGroup };
