import * as React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import { WrappedFieldProps } from 'redux-form';

interface IOwnProps {
  help?:  string;
  label?: string;
}

type IProps = WrappedFieldProps & IOwnProps;

class NoLabelFormGroup extends React.PureComponent<IProps> {
  private labelBlock = () => {
    const { label } = this.props;

    if (!label) { return null; }

    return (
      <ControlLabel className="sr-only">
        { label }
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

const wrapNoLabelFormGroup = <P extends WrappedFieldProps>(Component: React.ComponentType<P>, groupProps = {}) => {
  // tslint:disable-next-line:max-classes-per-file
  class NoLabelFormGroupWrapper extends React.Component<IProps> {
    public static displayName = `NoLabelFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    public render() {
      const { input, meta, label, help, ...props } = this.props;

      return (
        <NoLabelFormGroup
          input={ input }
          meta={ meta }
          label={ label }
          help={ help }
        >
          <Component input={ input } meta={ meta } { ...props } />
        </NoLabelFormGroup>
      );
    }
  }

  return NoLabelFormGroupWrapper;
};

export {
  NoLabelFormGroup as default,
  IProps as INoLabelFormGroupProps,
  wrapNoLabelFormGroup,
};
