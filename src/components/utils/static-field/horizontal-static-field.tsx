import * as React from 'react';
import { Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

import { HORIZONTAL_FORM_LABEL_WIDTH } from 'constants/forms';

interface IProps {
  label:  string;
  value?: string | React.ReactNode;
}

const StaticField: React.SFC<IProps> = ({ label, value }) => (
  <FormGroup>
    <Col componentClass={ ControlLabel } sm={ HORIZONTAL_FORM_LABEL_WIDTH }>{ label }</Col>
    <Col sm={ 12 - HORIZONTAL_FORM_LABEL_WIDTH } >
      <FormControl.Static>{ value }</FormControl.Static>
    </Col>
  </FormGroup>
);

export default StaticField;
