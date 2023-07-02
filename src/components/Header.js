import {
  Box,
  Typography
} from '@mui/material';

import React from 'react';

const styles = {
  background: '#6fa037',
  padding: '10px 20px 10px 20px',
  borderRadius: '20px'
}

const Header = () => {
  return (
    <Box sx={styles}>

      <Typography 
        variant="h2" 
        fontSize="50px"
        fontWeight="lighter"
        color="#ffffff"
      >
        GreenThumb Garden Assistant
      </Typography>
    </Box>
  );
};

export default Header;