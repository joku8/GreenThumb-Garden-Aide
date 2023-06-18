import { 
  Box, 
  Typography,
  Paper
} from '@mui/material';

import React from 'react';

const SeedStorage = () => {
  // Component logic and state management can be added here

  return (
    <div>
      <Box component={Paper} sx={{ width: '100%', height: '100%', margin: 'auto' }}>
        <Typography variant="h4" component="h2" margin='0px 0px 0px 20px'>
          My Seed Vault
        </Typography>
      </Box>
    </div>
  );
};

export default SeedStorage;
