import React, { Component } from 'react';
import styles from './Home.css';
import NextSection from './NextSection';

class HomeSection extends Component {
  handleRsvpClick = () => { window.location = '#rsvp'; };

  render() {
    return (
      <div className={styles.home__wrapper}>
        <div className={styles.home__content}>
          <p className={styles.home__secondary}>Together with their families</p>
          <h3 className={[styles.home__primary, styles.amanda].join(' ')}>Amanda Thompson</h3>
          <div className={styles.home__amp__wrapper}>
            <div className={styles.home__amp__line} />
            <div className={styles.home__amp}>&amp;</div>
            <div className={styles.home__amp__line} />
          </div>
          <h3 className={[styles.home__primary, styles.erik].join(' ')}>Erik Christensen</h3>
          <h3 className={styles.home__secondary}>Request the honor of your presence<br />at their wedding celebration</h3>
          <button className={styles.home__button} onClick={this.handleRsvpClick}>RSVP</button>
        </div>
        <NextSection onClick={this.handleRsvpClick} />
      </div>
    );
  }
}

export default HomeSection;
