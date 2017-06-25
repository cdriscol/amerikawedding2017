import React, { Component, PropTypes } from 'react';
import Youtube from 'react-youtube';

const rickRollId = 'dQw4w9WgXcQ';
const basementJaxxId = '5rAOyh7YmEc';
const cubsWin = 'HOp8w2PgHlM';
const mpWin = 'RVmKQNuMSdM';
const nateWreck = 'l1cKAwv_HOg';
export default class ThankYou extends Component {

  static contextTypes = {
    count: PropTypes.number,
    names: PropTypes.string,
  };
  renderYoutube = (videoId, start = 0) => {
    return (
      <Youtube
        videoId={videoId}
        opts={{
          width: '100%',
          height: '',
          playerVars: {
            autoplay: 1,
            start,
          },
        }}
      />
    );
  };

  renderCustomElement = () => {
    const { names } = this.context;
    const booMatch = /Dan.*Slaubaugh/;
    const chrisMatch = /Chris.*Driscol/;
    const nateMatch = /Nate.*Miller/;
    const brentMatch = /Brent.*Yotty/;
    const daneMatch = /Dane.*Miller/;
    const seanMatch = /Sean.*Thornton/;
    if (names.match(booMatch)) return this.renderYoutube(rickRollId);
    if (names.match(nateMatch)) return this.renderYoutube(basementJaxxId, 36);
    if (names.match(brentMatch)) return this.renderYoutube(cubsWin);
    if (names.match(seanMatch)) return this.renderYoutube(mpWin, 6678);
    if (names.match(daneMatch) || names.match(chrisMatch)) return this.renderYoutube(nateWreck);
    return null;
  };

  render() {
    const { count } = this.context;
    let message = 'If you change your mind, you can RSVP again';
    if (count > 0) message = 'We look forward to seeing you!';

    return (
      <div>
        <h5 style={{ textAlign: 'center' }}>{message}</h5>
        {this.renderCustomElement()}
      </div>
    );
  }
}
