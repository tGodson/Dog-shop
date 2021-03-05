import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/dogshop.png';
import styles from './css/Navbar.module.css';

const Navbar = () => (
  <nav className={styles.nav}>
    <div className={styles.container}>
      <ul className={styles.navItems}>
        <li>
          <Link to="/" className={styles.navBrand}>
            <img className={styles.navBrandImg} src={logo} alt="Brand logo" width="50" height="50" />
            Dog Shop
          </Link>
        </li>
      </ul>
      <ul className={styles.navItems}>
        <li className={styles.navLink}>
          {' '}
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navLink}>
          {' '}
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
