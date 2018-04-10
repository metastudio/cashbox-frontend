import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

const VerticalFormGroup = ({ input, meta, label, help, children }) => {
  const error = Array.isArray(meta.error) ? meta.error.join(', ') : meta.error;

  return (
    <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null } >
      { label && <ControlLabel>{ label }</ControlLabel> }
      { children }
      { meta.invalid && <HelpBlock>{ error }</HelpBlock> }
      { help && <HelpBlock>{ help }</HelpBlock> }
    </FormGroup>
  );
};

VerticalFormGroup.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    error:   PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ])
  }).isRequired,
  label:    PropTypes.string,
  help:     PropTypes.string,
  children: PropTypes.node.isRequired,
};

const wrapVerticalFormGroup = (Component, groupProps = {}) => {
  class VerticalFormGroupWrapper extends React.Component {
    render() {
      const { input, meta, label, labelProps, help, ...props } = this.props;

      return (
        <VerticalFormGroup input={ input } meta={ meta } label={ label } labelProps={ labelProps } help={ help } { ...groupProps } >
          <Component input={ input } meta={ meta } {...props} />
        </VerticalFormGroup>
      );
    }
  }

  VerticalFormGroupWrapper.propTypes = {
    input:      PropTypes.object.isRequired,
    meta:       PropTypes.object.isRequired,
    label:      PropTypes.string,
    labelProps: PropTypes.object,
    help:       PropTypes.string,
  };

  VerticalFormGroupWrapper.displayName = `VerticalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

  return VerticalFormGroupWrapper;
};

export { VerticalFormGroup as default, wrapVerticalFormGroup };
