import React, { Component, PropTypes } from 'react';
import styles from './Rsvp.css';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import callApi from '../../../util/apiCaller';
import RsvpError from './Rsvp/Error';

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
  static contextTypes = {
    code: PropTypes.string,
    setCode: PropTypes.func.isRequired,
    row: PropTypes.object,
    setRow: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      submitting: false,
      error: null,
    };
  }

  getCodeError = () => {
    const { submitted } = this.state;
    const { code } = this.context;
    if (submitted && !code) return 'A code is required';
    return null;
  };

  handleRsvpSubmit = () => {
    const { code, row } = this.context;
    if (row.count) {
      for (let i = 0; i < row.count; i++) {
        if (!row.attending[i]) {
          this.setState({ error: 'You must list your guests' });
          return;
        }
      }
    }

    callApi(`rsvp/${code}`, 'post', row)
      .then(() => {
        this.setState({ successMessage: 'Done!' });
      })
      .catch(() => {
        const error = 'Something went wrong.. try again later.';
        this.setState({ error, successMessage: null });
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { code, row, setRow } = this.context;
    if (row) {
      this.handleRsvpSubmit();
      return;
    }
    if (code) {
      callApi(`rsvp/${code}`)
        .then(newRow => {
          this.setState({ submitted: false });
          setRow(newRow);
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
    const { setCode } = this.context;
    setCode(value);
    this.setState({ error: null });
  };

  handleGuestSelection = ({ target: { value } }) => {
    const { row, setRow } = this.context;
    row.count = Number(value);
    setRow(row);
  };

  handleGuestNameChange = (index, { target: { value } }) => {
    const { row, setRow } = this.context;
    if (!row.attending) row.attending = [];
    for (let i = 0; i < row.count; i++) {
      if (row.attending.length <= i) row.attending.push('');
    }
    row.attending[index] = value;
    this.setState({ error: null });
    setRow(row);
  };

  handleMessageChange = ({ target: { value } }) => {
    const { row, setRow } = this.context;
    row.message = value;
    setRow(row);
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
    const { code, row } = this.context;
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
          error={this.getCodeError()}
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
    const { error, submitting } = this.state;
    const { row } = this.context;
    const currentError = this.getCodeError() || error;
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
    const { successMessage } = this.state;

    return (
      <div className={styles.rsvp__wrapper}>
        <div className={styles.rsvp__content}>
          <h3 className={styles.rsvp__title}>RSVP</h3>
          <div className={styles.rsvp__formWrapper}>
            {this.renderForm()}
            {successMessage && this.renderSuccessMessage()}
          </div>
          <div className={styles.rsvp__formLeaf1}></div>
          <div className={styles.rsvp__formLeaf2}></div>
        </div>
      </div>
    );
  }
}

export default RsvpSection;
