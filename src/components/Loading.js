import React from 'react';
import PropTypes from 'prop-types';

import styles from './Loading.module.css';

const Loading = ({ msg }) => (
  <div className={styles.container}>
    <h3 className={styles.message}>{msg}</h3>
    <div className={styles.sk_folding_cube}>
      <div className={`${styles.sk_cube1} ${styles.sk_cube}`} />
      <div className={`${styles.sk_cube2} ${styles.sk_cube}`} />
      <div className={`${styles.sk_cube4} ${styles.sk_cube}`} />
      <div className={`${styles.sk_cube3} ${styles.sk_cube}`} />
    </div>
  </div>
);

Loading.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Loading;
