import React, { Component, PropTypes } from 'react';
import styles from './Form.css';
import { Form, Button } from 'react-bootstrap';
import RsvpError from './Error';
import ResponseForm from './ResponseForm';
import RsvpCodeInput from './CodeInput';

export default class RsvpForm extends Component {
  static contextTypes = {
    code: PropTypes.string,
    setCode: PropTypes.func.isRequired,
    codeError: PropTypes.string,
    codeConfirmed: PropTypes.bool,
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
    const { codeConfirmed, postRsvp, fetchRsvp } = this.context;
    return codeConfirmed ? postRsvp() : fetchRsvp();
  };

  render() {
    const { codeConfirmed, codeError, error, submitting } = this.context;
    const currentError = codeError || error;
    return (
      <Form className={styles.rsvp__form} onSubmit={this.handleSubmit}>
        {!codeConfirmed && <RsvpCodeInput />}
        {codeConfirmed && <ResponseForm />}
        <Button disabled={submitting} onClick={this.handleSubmit} className={[styles.rsvp__form__submit]} bsStyle="primary" type="button" block>
          {codeConfirmed ? 'Send' : 'Submit'}
        </Button>
        <RsvpError error={currentError} />
      </Form>
    );
  }
}
