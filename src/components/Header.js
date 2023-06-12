import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>GreenThumb Garden Helper</h1>
      {/* Add any additional content or navigation elements */}
    </header>
  );
};

export default Header;