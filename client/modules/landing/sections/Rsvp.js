import React, { Component, PropTypes } from 'react';
import styles from './Rsvp.css';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import RsvpError from './Rsvp/Error';
import FieldGroup from './Rsvp/FieldGroup';

class RsvpSection extends Component {
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
    updateGuest: PropTypes.func.isRequired,
    successMessage: PropTypes.string,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { row, postRsvp, fetchRsvp } = this.context;
    return row ? postRsvp() : fetchRsvp();
  };

  handleCodeChange = ({ target: { value } }) => {
    this.context.setCode(value);
  };

  handleGuestSelection = ({ target: { value } }) => {
    this.context.setCount(value);
  };

  handleGuestNameChange = (index, { target: { value } }) => {
    this.context.updateGuest(index, value);
  };

  handleMessageChange = ({ target: { value } }) => {
    this.context.setMessage(value);
  };

  renderGuestOptions = () => {
    const { row: { size } } = this.context;
    const options = [];
    for (let i = 0; i <= size; i++) {
      let value = 'I will not be attending';
      if (i > 0) value = `${i} guest${i > 1 ? 's' : ''}`;
      options.push(<option key={i} value={i}>{value}</option>);
    }
    return options;
  };

  renderGuestInput = (index, attending) => {
    const value = index < attending.length ? attending[index] : '';
    return (
      <div key={index} className={styles.rsvp__guestInputWrapper}>
        <div className={styles.rsvp__guestInputIndex}>{index + 1}</div>
        <div className={styles.rsvp__guestInputInput}>
          <FieldGroup
            id={`attending${index}`}
            type="text"
            label="Name"
            placeholder={index % 2 === 1 ? 'Jan Doe' : 'John Doe'}
            className={[styles.rsvp__form__input]}
            onChange={this.handleGuestNameChange.bind(this, index)}
            value={value}
            error={!value ? 'Name required' : null}
          />
        </div>
      </div>
    );
  };

  renderGuestInputs = () => {
    const { row: { count, attending } } = this.context;
    const guestInputs = [];
    for (let i = 0; i < count; i++) {
      guestInputs.push(this.renderGuestInput(i, attending));
    }
    return guestInputs;
  };

  renderRowFormControls = () => {
    const { row: { size, count } } = this.context;
    return (
      <div className={styles.rsvp__rowWrapper}>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Counting yourself, how many guests total are you RSVPing for?</ControlLabel>
          <FormControl value={count} componentClass="select" placeholder="select" onChange={this.handleGuestSelection}>
            {this.renderGuestOptions(size)}
          </FormControl>
        </FormGroup>
        {count ? <h4>List guests</h4> : null}
        {this.renderGuestInputs()}
      </div>
    );
  };

  renderMessage = () => {
    const { row: { message } } = this.context;
    return (
      <div>
        <h4>Message</h4>
        <FieldGroup
          id="message"
          componentClass="textarea"
          type="textarea"
          label="Send a message to the couple"
          placeholder="Write your message.."
          className={[styles.rsvp__form__input]}
          onChange={this.handleMessageChange}
          value={message}
        />
      </div>
    );
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

  renderForm = () => {
    const { row, codeError, error, submitting } = this.context;
    const currentError = codeError || error;
    return (
      <Form className={styles.rsvp__form} onSubmit={this.handleSubmit}>
        {!row && this.renderCodeInput()}
        {row && this.renderHello()}
        {row && this.renderRowFormControls()}
        {row && this.renderMessage()}
        <Button disabled={submitting} onClick={this.handleSubmit} className={[styles.rsvp__form__submit]} bsStyle="primary" type="button" block>
          {row ? 'Send' : 'Submit'}
        </Button>
        <RsvpError error={currentError} />
      </Form>
    );
  };

  renderSuccessMessage = () => {
    return (
      <div className={styles.rsvp__successWrapper}>
        <h3>Thank you!</h3>
      </div>
    );
  };

  render() {
    const { successMessage } = this.context;

    return (
      <div className={styles.rsvp__wrapper}>
        <div className={styles.rsvp__content}>
          <h3 className={styles.rsvp__title}>RSVP</h3>
          <div className={styles.rsvp__formWrapper}>
            {this.renderForm()}
            {successMessage && this.renderSuccessMessage()}
          </div>
          <div className={styles.rsvp__formLeaf1} />
          <div className={styles.rsvp__formLeaf2} />
        </div>
      </div>
    );
  }
}

export default RsvpSection;
