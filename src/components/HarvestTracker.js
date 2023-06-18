import { 
  Box,
  Paper,
  Typography,
} from '@mui/material';

import React from 'react';

const HarvestTracker = () => {

  return (
    <div>
      <Box component={Paper} sx={{ width: '100%', height: '100%', margin: 'auto' }}>
        <Typography variant="h4" component="h2" margin='0px 0px 0px 20px'>
          Harvest Tracker
        </Typography>
      </Box>
    </div>
  );
};

export default HarvestTracker;