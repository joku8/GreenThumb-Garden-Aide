import {
  Box,
  Button,
  Stack,
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
      <Stack 
      direction="row" 
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      >
        <Typography 
          variant="h2" 
          fontSize="50px"
          fontWeight="lighter"
          color="#ffffff"
        >
          GreenThumb Garden Assistant
        </Typography>
        <Stack
        direction="row" 
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        >
          <Button
            variant="contained"
            onClick={() => {console.log("Upload");}}
          >
            Upload
          </Button>
          <Button
            variant="contained"
            onClick={() => {console.log("Save");}}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={() => {console.log("Autosave");}}
          >
            Autosave
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;