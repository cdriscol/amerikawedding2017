import React, { Component, PropTypes } from 'react';
import Youtube from 'react-youtube';

export default class ThankYou extends Component {
  static contextTypes = {
    count: PropTypes.number,
    names: PropTypes.string,
  };

  renderRickRoll = () => {
    return (
      <Youtube
        videoId="dQw4w9WgXcQ"
        opts={{
          width: '100%',
          height: '',
          playerVars: { autoplay: 1 },
        }}
      />
    );
  };

  renderCustomElement = () => {
    const { names } = this.context;
    const booMatch = /Dan.*Slaubaugh/;
    const chrisMatch = /Chris.*Driscol/;
    if (names.match(booMatch) || names.match(chrisMatch)) return this.renderRickRoll();
    return null;
  };

  render() {
    const { count } = this.context;
    let message = 'If you change your mind, you can RSVP again';
    if (count > 0) message = 'We look forward to seeing you!';

    return (
      <div>
        <h4 style={{ textAlign: 'center' }}>{message}</h4>
        {this.renderCustomElement()}
      </div>
    );
  }
}
