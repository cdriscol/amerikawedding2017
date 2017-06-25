import React, { Component } from 'react';
import styles from './ThankYou.css';
import { TweenMax } from 'gsap';

export default class ThankYou extends Component {
  componentDidMount() {
    TweenMax.from(this.element, 1, { opacity: 0 });
  }

  render() {
    return (
      <div className={styles.thankYou}>
        <h3 ref={e => { this.element = e; }}>Thank you!</h3>
      </div>
    );
  }
}
