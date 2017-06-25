import React, { Component, PropTypes } from 'react';
import styles from './Error.css';

class RsvpError extends Component {
  static propTypes = {
    error: PropTypes.string,
  };

  render() {
    const { error } = this.props;
    return (
      <div className={[styles.rsvp__form__errorWrapper]}>
        <div className={[styles.rsvp__form__error, error && styles.isError].join(' ')}>{error}</div>
      </div>
    );
  }
}

export default RsvpError;
