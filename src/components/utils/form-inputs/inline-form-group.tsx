import * as React from 'react';

import { ControlLabel, FormGroup, HelpBlock } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

interface IOwnProps {
  help?:       string;
  label?:      string;
  required?:   boolean;
  labelProps?: ControlLabel.ControlLabelProps;
}

type IProps = WrappedFieldProps & IOwnProps;

class InlineFormGroup extends React.PureComponent<IProps> {
  private labelBlock = () => {
    const { label, required, labelProps = {} } = this.props;

    if (!label) { return null; }

    return (
      <ControlLabel { ...labelProps } >
        { label }{ required && <span className="required">*</span> }
      </ControlLabel>
    );
  }

  private errorBlock = () => {
    const { meta: { invalid, error } } = this.props;

    if (!invalid) { return null; }

    return (
      <HelpBlock>
        { Array.isArray(error) ? error.join(', ') : error }
      </HelpBlock>
    );
  }

  private helpBlock = () => {
    const { help } = this.props;

    if (!help) { return null; }

    return <HelpBlock>{ help }</HelpBlock>;
  }

  public render () {
    const { input, meta, children } = this.props;

    return (
      <FormGroup controlId={ input.name } validationState={ meta.invalid ? 'error' : null }>
        { this.labelBlock() }
        { ' ' }
        { children }
        { this.errorBlock() }
        { this.helpBlock() }
      </FormGroup>
    );
  }
}

const wrapInlineFormGroup = <P extends WrappedFieldProps>(Component: React.ComponentType<P>, groupProps = {}) => {
  // tslint:disable-next-line:max-classes-per-file
  class InlineFormGroupWrapper extends React.Component<IProps> {
    public static displayName = `InlineFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    public render() {
      const { input, meta, label, labelProps, required, help, ...props } = this.props;

      return (
        <InlineFormGroup
          input={ input }
          meta={ meta }
          label={ label }
          labelProps={ labelProps }
          help={ help }
          required={ required }
        >
          <Component input={ input } meta={ meta } { ...props } />
        </InlineFormGroup>
      );
    }
  }

  return InlineFormGroupWrapper;
};

export {
  InlineFormGroup as default,
  IProps as IInlineFormGroupProps,
  wrapInlineFormGroup,
};
