import React, { Component, PropTypes } from 'react';
import styles from '../Rsvp.css';
import { Form, Button } from 'react-bootstrap';
import RsvpError from './Error';
import FieldGroup from './FieldGroup';
import RsvpGuestInputs from './GuestInputs';
import RsvpMessage from './Message';

export default class RsvpForm extends Component {
  static contextTypes = {
    code: PropTypes.string,
    setCode: PropTypes.func.isRequired,
    codeError: PropTypes.string,
    row: PropTypes.object,
    setRow: PropTypes.func.isRequired,
    submitted: PropTypes.bool,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    fetchRsvp: PropTypes.func.isRequired,
    postRsvp: PropTypes.func.isRequired,
    setCount: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { row, postRsvp, fetchRsvp } = this.context;
    return row ? postRsvp() : fetchRsvp();
  };

  handleCodeChange = ({ target: { value } }) => {
    this.context.setCode(value);
  };

  renderCodeInput = () => {
    const { code, row, codeError } = this.context;
    return (
      <div>
        <h4>Enter the code from your invitation card</h4>
        <FieldGroup
          id="rsvpCode"
          type="text"
          label="RSVP Code"
          placeholder="RSVP Code"
          className={[styles.rsvp__form__input]}
          onChange={this.handleCodeChange}
          value={code}
          error={codeError}
          disabled={row}
        />
      </div>
    );
  };

  renderHello = () => {
    const { row } = this.context;
    return (
      <h4>Hello, {row.names}!</h4>
    );
  };

  render() {
    const { row, codeError, error, submitting } = this.context;
    const currentError = codeError || error;
    return (
      <Form className={styles.rsvp__form} onSubmit={this.handleSubmit}>
        {!row && this.renderCodeInput()}
        {row && this.renderHello()}
        {row && <RsvpGuestInputs />}
        {row && <RsvpMessage />}
        <Button disabled={submitting} onClick={this.handleSubmit} className={[styles.rsvp__form__submit]} bsStyle="primary" type="button" block>
          {row ? 'Send' : 'Submit'}
        </Button>
        <RsvpError error={currentError} />
      </Form>
    );
  }
}
