import React, { Component, PropTypes } from 'react';
import styles from './Rsvp.css';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import callApi from '../../../util/apiCaller';

function FieldGroup({ id, label, error, ...props }) {
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

class RsvpSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      submitted: false,
      submitting: false,
      error: null,
      row: null,
    };
  }

  getCodeError = () => {
    const { code, submitted } = this.state;
    if (submitted && !code) return 'A code is required';
    return null;
  };

  handleRsvpSubmit = () => {
    const { row } = this.state;
    if (row.count) {
      for (let i = 0; i < row.count; i++) {
        if (!row.attending[i]) {
          this.setState({ error: 'You must list your guests' });
          return;
        }
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { code, row } = this.state;
    if (row) {
      this.handleRsvpSubmit();
      return;
    }
    if (code) {
      callApi(`rsvp/${this.state.code}`)
        .then(newRow => {
          this.setState({ row: newRow, submitted: false });
        })
        .catch(rawError => {
          let error = 'Something went wrong.. try again later.';
          if (rawError.status === 404) error = 'Code not found..';
          this.setState({ error, submitted: true });
        });
    } else {
      this.setState({ submitted: true });
    }
  };

  handleCodeChange = ({ target: { value } }) => {
    this.setState({ code: value, error: null });
  };

  handleGuestSelection = ({ target: { value } }) => {
    const { row } = this.state;
    row.count = Number(value);
    this.setState({ row });
  };

  handleGuestNameChange = (index, { target: { value } }) => {
    const { row, count } = this.state;
    if (!row.attending) row.attending = [];
    for (let i = 0; i < count; i++) {
      if (row.attending.length <= i) row.attending.push('');
    }
    row.attending[index] = value;
    this.setState({ row, error: null });
  };

  handleMessageChange = ({ target: { value } }) => {
    const { row } = this.state;
    row.message = value;
    this.setState({ row });
  };

  renderGuestOptions = () => {
    const { row: { count, size } } = this.state;
    const options = [];
    for (let i = 0; i <= size; i++) {
      options.push(<option key={i} value={i} selected={i === count}>{i} guest{i > 1 ? 's' : ''}</option>);
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
            placeholder="John Doe"
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
    const { row: { count, attending } } = this.state;
    const guestInputs = [];
    for (let i = 0; i < count; i++) {
      guestInputs.push(this.renderGuestInput(i, attending));
    }
    return guestInputs;
  };

  renderRowFormControls = () => {
    const { row: { size, count } } = this.state;
    return (
      <div className={styles.rsvp__rowWrapper}>
        <h4>Guests</h4>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Counting yourself, how many guests total are you RSVPing for?</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleGuestSelection}>
            {this.renderGuestOptions(size)}
          </FormControl>
        </FormGroup>
        {count ? <h4>List guests</h4> : null}
        {this.renderGuestInputs()}
      </div>
    );
  };

  renderMessage = () => {
    const { row: { message } } = this.state;
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

  render() {
    const { code, error, row, submitting } = this.state;

    return (
      <div className={styles.rsvp__wrapper}>
        <div className={styles.rsvp__content}>
          <h3 className={styles.rsvp__title}>RSVP</h3>
          <div className={styles.rsvp__formWrapper}>
            <Form className={styles.rsvp__form} onSubmit={this.handleSubmit}>
              <h4>Enter the code from your invitation card</h4>
              <FieldGroup
                id="rsvpCode"
                type="text"
                label="RSVP Code"
                placeholder="RSVP Code"
                className={[styles.rsvp__form__input]}
                onChange={this.handleCodeChange}
                value={code}
                error={this.getCodeError()}
                disabled={row}
              />
              {row && this.renderRowFormControls()}
              {row && this.renderMessage()}
              <Button disabled={submitting} onClick={this.handleSubmit} className={[styles.rsvp__form__submit]} bsStyle="primary" type="button" block>
                {row ? 'Send' : 'Submit'}
              </Button>
              <div className={[styles.rsvp__form__errorWrapper]}>
                <div className={[styles.rsvp__form__error]}>{this.getCodeError() || error}</div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default RsvpSection;
