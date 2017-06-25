import React, { Component } from 'react';
import styles from './ThankYou.css';
import { TweenMax } from 'gsap';
import ThankYouCustom from './ThankYouCustom';

export default class ThankYou extends Component {
  componentDidMount() {
    TweenMax.from(this.element, 1, { opacity: 0 });
  }

  render() {
    return (
      <div className={styles.thankYou} ref={e => { this.element = e; }}>
        <h3>Thank you!</h3>
        <ThankYouCustom />
      </div>
    );
  }
}
