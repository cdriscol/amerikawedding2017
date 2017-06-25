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

  handleSubmit = () => {
    const { code } = this.state;
    if (code) {
      callApi(`rsvp/${this.state.code}`)
        .then(row => {
          this.setState({ row, submitted: false });
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
    row.count = value;
    this.setState({ row });
  };

  renderGuestOptions = () => {
    const { row: { count, size } } = this.state;
    const options = [];
    for (let i = 0; i <= size; i++) {
      options.push(<option value={i} selected={i === count}>{i} guest{i > 1 ? 's' : ''}</option>);
    }
    return options;
  };

  renderRowFormControls = () => {
    const { row: { size } } = this.state;
    return (
      <div className={styles.rsvp__rowWrapper}>
        <h4>Guests</h4>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Counting yourself, how many guests total are you RSVPing for?</ControlLabel>
          <FormControl componentClass="select" placeholder="select" onChange={this.handleGuestSelection}>
            {this.renderGuestOptions(size)}
          </FormControl>
        </FormGroup>
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
            <Form className={styles.rsvp__form}>
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
              <Button disabled={submitting} onClick={this.handleSubmit} className={[styles.rsvp__form__submit]} bsStyle="primary" type="button" block>
                Submit
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
