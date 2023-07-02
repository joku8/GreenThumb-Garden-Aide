import {
  Box, 
  Typography,
  Paper
} from '@mui/material';

import React from 'react';

const styles = {
  width: '93%',
  height: '350px',
  padding: '10px 20px 10px 20px',
  backgroundColor: '#e5e5e5',
  borderRadius: '20px'
}

const TaskManager = () => {
  // Component logic and state management can be added here
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
          Task Manager
        </Typography>
      </Box>
    </div>
  );
};

export default TaskManager;
