import { 
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography 
          variant="h4"
          fontWeight="lighter"
          >
            Harvest Tracker
          </Typography>
          <IconButton
            onClick={() => {console.log("Add Harvest"); }}
          >
            <AddIcon fontSize='large'/>
          </IconButton>
        </Stack>
      </Box>
    </div>
  );
};

export default HarvestTracker;