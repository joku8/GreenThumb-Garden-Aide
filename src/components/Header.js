import {
  Typography
} from '@mui/material';

import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Typography variant="h2" color="inherit" align="center">
        Garden Assistant
      </Typography>
    </header>
  );
};

export default Header;