import React from 'react'
import { Row, Col, FormControl } from 'react-bootstrap'

import FormGroup from './horizontal-form-group.jsx'

export const HorizontalImageInput = ({ field, label, ...inputProps }) => {
  const handleChange = (e) => {
    e.preventDefault()

    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (upload) => {
      field.onChange(upload.target.result)
    }
    reader.readAsDataURL(file)
  }

  const imgSrc = () => {
    if (field.dirty) {
      return field.value
    } else {
      if (field.value && field.value.thumb) {
        return field.value.thumb.url
      }
    }
  }

  return (
    <FormGroup field={ field } label={ label } >
      <Row>
        <Col sm={9}>
          <FormControl type="file" {...inputProps} {...field} onChange={ handleChange } value={ null } />
        </Col>
        <Col sm={3}>
          <img src={ imgSrc() } style={ { maxWidth: '48px', maxHeight: '48px', float: 'right' } } />
        </Col>
      </Row>
    </FormGroup>
  )
}

HorizontalImageInput.propTypes = {
  field: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
}
