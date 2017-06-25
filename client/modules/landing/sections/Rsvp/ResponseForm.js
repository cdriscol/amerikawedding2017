import React, { Component, PropTypes } from 'react';
import RsvpGuestInputs from './GuestInputs';
import RsvpMessage from './Message';
import { TweenMax } from 'gsap';

export default class ResponseForm extends Component {
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

  componentDidMount() {
    TweenMax.from(this.wrapper, 1, { opacity: 0 });
  }

  render() {
    const { row } = this.context;
    return (
      <div ref={e => { this.wrapper = e; }}>
        <h4>Hello, {row.names}!</h4>
        <RsvpGuestInputs />
        <RsvpMessage />
      </div>
    );
  }
}
