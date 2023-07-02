import { 
  Box,
  Paper,
  Typography,
} from '@mui/material';

import React from 'react';

const styles = {
  width: '95%',
  height: '350px',
  padding: '10px 20px 10px 20px',
  backgroundColor: '#e5e5e5',
  borderRadius: '20px'
}

const HarvestTracker = () => {

  return (
    <div>
      <Box 
        component={Paper} 
        elevation={2}
        sx={styles}
      >
        <Typography 
          variant="h4"
          fontWeight="lighter"
        >
          Harvest Tracker
        </Typography>
      </Box>
    </div>
  );
};

export default HarvestTracker;