import React, { Component, PropTypes } from 'react';
import RsvpGuestInputs from './GuestInputs';
import RsvpMessage from './Message';
import { TweenMax } from 'gsap';

export default class ResponseForm extends Component {
  static contextTypes = {
    names: PropTypes.string,
  };

  componentDidMount() {
    TweenMax.from(this.wrapper, 1, { opacity: 0 });
  }

  render() {
    const { names } = this.context;
    return (
      <div ref={e => { this.wrapper = e; }}>
        <h4>Hello, {names}!</h4>
        <RsvpGuestInputs />
        <RsvpMessage />
      </div>
    );
  }
}
