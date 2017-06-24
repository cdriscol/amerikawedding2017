import React from 'react';
import styles from './Footer.css';

export function Footer() {
  return (
    <div className={styles.footer}>
      <p>&copy; {new Date().getFullYear()}</p>
    </div>
  );
}

export default Footer;
