import React from 'react';
import styles from './css/Contact.module.css';

import email from '../assets/email.png';
import github from '../assets/github.png';
import resume from '../assets/resume.png';

const Contact = () => (
  <div className={styles.container}>
    <h3>Contact me</h3>
    <ul className={styles.links}>
      <li className={styles.link}>
        <img className={styles.img} width="30" height="30" src={github} alt="Github" />
        <a href="https://github.com/tGodson/" target="_blank" rel="noreferrer">
          tGodson
        </a>
      </li>
      <li className={styles.link}>
        <img className={styles.img} width="30" height="30" src={email} alt="Mail" />
        <a href="mailto:tedongzegodson@gmail.com" target="_blank" rel="noreferrer">
          tedongzegodson@gmail.com
        </a>
      </li>
      <li className={styles.link}>
        <img className={styles.img} width="30" height="30" src={resume} alt="Portfolio" />
        <a href="https://www.tendongzegodson.me/" target="_blank" rel="noreferrer">
          tendongzegodson.me
        </a>
      </li>
    </ul>
  </div>
);

export default Contact;
