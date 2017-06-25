import React, { Component, PropTypes } from 'react';
import styles from './ThankYou.css';
import { TweenMax } from 'gsap';

export default class ThankYou extends Component {
  static contextTypes = {
    count: PropTypes.number,
  };

  componentDidMount() {
    TweenMax.from(this.element, 1, { opacity: 0 });
  }

  renderCustomThankYou = () => {

  };

  render() {
    return (
      <div className={styles.thankYou}>
        <h3 ref={e => { this.element = e; }}>Thank you!</h3>
        {this.renderCustomThankYou()}
      </div>
    );
  }
}
