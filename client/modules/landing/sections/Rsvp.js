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

  renderRowFormControls = () => {
    // const { row } = this.state;
    return (
      <div>
        Coming soon..
      </div>
    );
  };

  render() {
    const { code, error, row } = this.state;

    return (
      <div className={styles.rsvp__wrapper}>
        <div className={styles.rsvp__content}>
          <h3 className={styles.rsvp__title}>RSVP</h3>
          <div className={styles.rsvp__formWrapper}>
            <Form className={styles.rsvp__form}>
              <span className={row && styles.hide}>
                <FieldGroup
                  id="rsvpCode"
                  type="text"
                  label="RSVP Code"
                  placeholder="RSVP Code"
                  className={[styles.rsvp__form__input]}
                  onChange={this.handleCodeChange}
                  value={code}
                  error={this.getCodeError()}
                />
              </span>
              {row && this.renderRowFormControls()}
              <Button onClick={this.handleSubmit} className={[styles.rsvp__form__submit]} bsStyle="primary" type="button" block>
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
