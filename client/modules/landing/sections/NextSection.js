import React, { Component } from 'react';
import styles from './NextSection.css';
import { TweenMax } from 'gsap';

class HomeSection extends Component {
  componentDidMount() {
    TweenMax.fromTo(this.svg, 1.5, { opacity: 0.5 }, { opacity: 1, scale: 1.25, yoyo: true, repeat: -1 });
  }

  render() {
    return (
      <div className={styles.nextSection__wrapper}>
        <div {...this.props}>
          <div>
            <svg
              viewBox="0 0 24 24"
              className={styles.nextSection__svg}
              ref={e => { this.svg = e; }}
            >
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeSection;
