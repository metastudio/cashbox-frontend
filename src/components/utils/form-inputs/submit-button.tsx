import * as React from 'react';
import { Button, Row, Col, FormGroup } from 'react-bootstrap';

interface IProps {
  submitting:       boolean;
  invalid?:         boolean;
  submitFailed?:    boolean;
  submitSucceeded?: boolean;
  bsStyle?:         string;
  className?:       string;
}

const SubmitButton: React.SFC<IProps> = (props) => {
  const {
    children,
    submitting,
    invalid,
    submitSucceeded,
    submitFailed,
    ...buttonProps
  } = props;

  let icon: React.ReactNode = '';
  let bsStyle = props.bsStyle || 'primary';

  if (submitting) {
    icon = <i className="fa fa-spinner fa-spin" aria-hidden="true" />;
  } else {
    if (submitSucceeded) {
      icon = <i className="fa fa-check" aria-hidden="true" />;
      bsStyle = 'success';
    } else if (submitFailed) {
      icon = <i className="fa fa-close" aria-hidden="true" />;
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

SubmitButton.defaultProps = {
  submitting:      false,
  submitFailed:    false,
  submitSucceeded: false,
};

interface IHorizontalSubmitButtonProps {
  additionalContent?: React.ReactNode;
}

const HorizontalSubmitButton: React.SFC<IHorizontalSubmitButtonProps & IProps> =
  ({ additionalContent, ...props }) => (
  <FormGroup>
    <Col smOffset={ 3 } sm={ 9 }>
      <SubmitButton { ...props } />
      { additionalContent }
    </Col>
  </FormGroup>
);

const VerticalSubmitButton: React.SFC<IProps> = props => (
  <Row>
    <Col sm={ 12 }>
      <SubmitButton className="pull-right" { ...props } />
    </Col>
  </Row>
);

export { SubmitButton, HorizontalSubmitButton, VerticalSubmitButton };
