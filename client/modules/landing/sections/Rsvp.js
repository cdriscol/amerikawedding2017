import React, { Component, PropTypes } from 'react';
import styles from './Rsvp.css';
import ThankYou from './Rsvp/ThankYou';
import RsvpForm from './Rsvp/Form';

class RsvpSection extends Component {
  static contextTypes = {
    successMessage: PropTypes.string,
  };

  render() {
    const { successMessage } = this.context;

    return (
      <div className={styles.rsvp__wrapper}>
        <div className={styles.rsvp__content}>
          <h3 className={styles.rsvp__title}>RSVP</h3>
          <div className={styles.rsvp__formWrapper}>
            <RsvpForm />
            {successMessage && <ThankYou />}
          </div>
          <div className={styles.rsvp__formLeaf1} />
          <div className={styles.rsvp__formLeaf2} />
        </div>
      </div>
    );
  }
}

export default RsvpSection;
