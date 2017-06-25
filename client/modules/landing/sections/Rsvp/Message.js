import React, { Component, PropTypes } from 'react';
import FieldGroup from './FieldGroup';

export default class RsvpMessage extends Component {
  static contextTypes = {
    message: PropTypes.string,
    setMessage: PropTypes.func.isRequired,
  };

  handleMessageChange = ({ target: { value } }) => {
    this.context.setMessage(value);
  };

  render() {
    const { message } = this.context;
    return (
      <div>
        <h4>Message</h4>
        <FieldGroup
          id="message"
          componentClass="textarea"
          type="textarea"
          label="Send a message to the couple"
          placeholder="Write your message.."
          onChange={this.handleMessageChange}
          value={message}
        />
      </div>
    );
  }
}
