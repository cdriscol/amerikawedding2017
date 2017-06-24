import React from 'react';
import styles from './Header.css';

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

export default Header;
