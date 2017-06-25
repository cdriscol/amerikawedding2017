import React, { Component, PropTypes } from 'react';
import FieldGroup from './FieldGroup';

export default class RsvpCodeInput extends Component {
  static contextTypes = {
    row: PropTypes.object,
    setCode: PropTypes.func.isRequired,
  };

  handleCodeChange = ({ target: { value } }) => {
    this.context.setCode(value);
  };

  render() {
    const { code, row, codeError } = this.context;
    return (
      <div>
        <h4>Enter the code from your invitation card</h4>
        <FieldGroup
          id="rsvpCode"
          type="text"
          label="RSVP Code"
          placeholder="RSVP Code"
          onChange={this.handleCodeChange}
          value={code}
          error={codeError}
          disabled={row}
        />
      </div>
    );
  }
}
