import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

interface OwnProps {
  help?:  string;
  label?: string;
}

type Props = WrappedFieldProps & OwnProps;

const VerticalFormGroup: React.SFC<Props> = ({ input, meta, label, help, children }) => {
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

const wrapVerticalFormGroup = <P extends WrappedFieldProps>(Component: React.ComponentType<P>, groupProps = {}) => {
  class VerticalFormGroupWrapper extends React.Component<Props> {
    static displayName = `VerticalFormGroupWrapper(${Component.displayName || Component.name || 'Component'})`;

    render() {
      const { input, meta, label, help, ...props } = this.props;

      return (
        <VerticalFormGroup input={ input } meta={ meta } label={ label } help={ help } { ...groupProps } >
          <Component input={ input } meta={ meta } { ...props } />
        </VerticalFormGroup>
      );
    }
  }

  return VerticalFormGroupWrapper;
};

export { VerticalFormGroup as default, wrapVerticalFormGroup };
