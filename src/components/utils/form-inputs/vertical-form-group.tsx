import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

interface OwnProps {
  help?:     string;
  label?:    string;
  required?: boolean;
}

type Props = WrappedFieldProps & OwnProps;

class VerticalFormGroup extends React.Component<Props> {
  labelBlock = () => {
    const { label, required } = this.props;

    if (!label) { return null; }

    return (
      <ControlLabel>
        { label }{ required && <span className="required">*</span> }
      </ControlLabel>
    );
  }

  errorBlock = () => {
    const { meta: { invalid, error } } = this.props;

    if (!invalid) { return null; }

    return (
      <HelpBlock>
        { Array.isArray(error) ? error.join(', ') : error }
      </HelpBlock>
    );
  }

  helpBlock = () => {
    const { help } = this.props;

    if (!help) { return null; }

    return <HelpBlock>{ help }</HelpBlock>;
  }

  render() {
    const { input, meta, children } = this.props;

    return (
      <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null } >
        { this.labelBlock() }
        { children }
        { this.errorBlock() }
        { this.helpBlock() }
      </FormGroup>
    );
  }
}

const wrapVerticalFormGroup = <P extends WrappedFieldProps>(Component: React.ComponentType<P>, groupProps = {}) => {
  class VerticalFormGroupWrapper extends React.Component<Props> {
    static displayName = `VerticalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    render() {
      const { input, meta, label, help, required, ...props } = this.props;

      return (
        <VerticalFormGroup
          input={ input }
          meta={ meta }
          label={ label }
          help={ help }
          required={ required }
          { ...groupProps }
        >
          <Component input={ input } meta={ meta } { ...props } />
        </VerticalFormGroup>
      );
    }
  }

  return VerticalFormGroupWrapper;
};

export { VerticalFormGroup as default, wrapVerticalFormGroup };
