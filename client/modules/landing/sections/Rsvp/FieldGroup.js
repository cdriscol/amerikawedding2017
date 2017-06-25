import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default function FieldGroup({ id, label, error, ...props }) {
  return (
    <FormGroup controlId={id} validationState={error ? 'error' : null}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}
FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
};
