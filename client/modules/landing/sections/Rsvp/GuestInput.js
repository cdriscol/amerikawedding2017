import React, { Component, PropTypes } from 'react';
import styles from './GuestInputs.css';
import FieldGroup from './FieldGroup';
import { TweenMax } from 'gsap';

export default class RsvpGuestInput extends Component {
  static contextTypes = {
    row: PropTypes.object,
    updateGuest: PropTypes.func.isRequired,
  };

  static propTypes = {
    index: PropTypes.number,
    attending: PropTypes.arrayOf(PropTypes.string),
  };

  componentDidMount() {
    TweenMax.from(this.element, 1, { opacity: 0, height: 0 });
  }

  handleGuestNameChange = (index, { target: { value } }) => {
    this.context.updateGuest(index, value);
  };

  render() {
    const { index, attending } = this.props;
    const value = index < attending.length ? attending[index] : '';
    return (
      <div ref={e => { this.element = e; }} className={styles.rsvp__guestInputWrapper}>
        <div className={styles.rsvp__guestInputIndex}>{index + 1}</div>
        <div className={styles.rsvp__guestInputInput}>
          <FieldGroup
            id={`attending${index}`}
            type="text"
            label="Name"
            placeholder={index % 2 === 1 ? 'Jan Doe' : 'John Doe'}
            onChange={this.handleGuestNameChange.bind(this, index)}
            value={value}
            error={!value ? 'Name required' : null}
          />
        </div>
      </div>
    );
  }
}
