import React from 'react';
import styles from './css/Footer.module.css';
import globalStyles from '../Globals.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      Made with
      <span className={styles.hearts} role="img" aria-label="hearts">
        💕
      </span>
      by&nbsp;
      <a href="https://www.tendongzegodson.me/" className={globalStyles.textUnderline}>
        Tendongze Godson
      </a>
    </div>
  </footer>
);

export default Footer;
