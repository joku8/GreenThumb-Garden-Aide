import React from 'react';
import { 
  Box,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

const styles = {
  width: '95%',
  height: '350px',
  padding: '10px 20px 10px 20px',
  backgroundColor: '#e5e5e5',
  borderRadius: '20px'
}

const Calendar = () => {

  return (
    <div>
      <Box 
        component={Paper} 
        elevation={2}
        sx={styles}
      >
        <Stack direction="column">
          <Typography 
            variant="h4"
            fontWeight="lighter"
          >
            Calendar
          </Typography>
        </Stack>
      </Box>
    </div>
  );
};

export default Calendar;
