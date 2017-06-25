import React, { Component, PropTypes } from 'react';
import styles from '../Rsvp.css';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

export default class RsvpGuestInputs extends Component {
  static contextTypes = {
    row: PropTypes.object,
    updateGuest: PropTypes.func.isRequired,
    setCount: PropTypes.func.isRequired,
  };

  handleGuestSelection = ({ target: { value } }) => {
    this.context.setCount(value);
  };

  handleGuestNameChange = (index, { target: { value } }) => {
    this.context.updateGuest(index, value);
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

  render() {
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
  }
}
