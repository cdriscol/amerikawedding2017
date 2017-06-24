import React, { Component } from 'react';
import styles from './NextSection.css';

class HomeSection extends Component {
  render() {
    return (
      <div className={styles.nextSection__wrapper}>
        <div {...this.props}>
          <div>
            <svg
              viewBox="0 0 24 24"
              className={styles.nextSection__svg}
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
