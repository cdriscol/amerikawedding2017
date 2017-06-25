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

  componentDidUpdate(prevProps, prevState, prevContext) {
    const { row } = this.context;
    const { row: prevRow } = prevContext;
    if (prevRow === row) return;
    if (row) {
      console.log('hide code input');
    } else {
      console.log('show code input');
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { row, postRsvp, fetchRsvp } = this.context;
    return row ? postRsvp() : fetchRsvp();
  };

  render() {
    const { row, codeError, error, submitting } = this.context;
    const currentError = codeError || error;
    return (
      <Form className={styles.rsvp__form} onSubmit={this.handleSubmit}>
        {!row && <RsvpCodeInput />}
        {row && <ResponseForm />}
        <Button disabled={submitting} onClick={this.handleSubmit} className={[styles.rsvp__form__submit]} bsStyle="primary" type="button" block>
          {row ? 'Send' : 'Submit'}
        </Button>
        <RsvpError error={currentError} />
      </Form>
    );
  }
}