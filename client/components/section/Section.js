import React, { Component, PropTypes } from 'react';
import styles from './section.css';

export class Section extends Component {
  render() {
    return (
      <div className={styles.section__wrapper}>
        <div className={styles.section__content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Section;
