import { 
  Box, 
  Typography,
  Paper,
  Stack,
  IconButton,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import React from 'react';

const styles = {
  width: '95%',
  height: '350px',
  padding: '10px 20px 10px 20px',
  backgroundColor: '#e5e5e5',
  borderRadius: '20px',
  overflow: 'scroll',
}

const SeedStorage = ({
  seeds,
  addSeed,
}) => {
  // Component logic and state management can be added here

  return (
    <div>
      <Box 
        component={Paper} 
        elevation={2}
        sx={styles}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
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
                Seed Storage
              </Typography>
              <IconButton
                onClick={() => { addSeed()}}
              >
                <AddIcon fontSize='large'/>
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
          <Table component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell
                  align='center'
                  sx={{fontWeight: 'bold'}}
                >
                  Plant
                </TableCell>
                <TableCell
                  align='center'
                  sx={{fontWeight: 'bold'}}
                >
                  Cultivar
                </TableCell>
                <TableCell
                  align='center'
                  sx={{fontWeight: 'bold'}}
                >
                  Source
                </TableCell>
                <TableCell
                  align='center'
                  sx={{fontWeight: 'bold'}}
                >
                  Year
                </TableCell>
                <TableCell
                  align='center'
                  sx={{fontWeight: 'bold'}}
                >
                  Notes
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {seeds.map((seed) => (
                  <TableRow key={seed.id}>
                    <TableCell align='center'>{seed.plant}</TableCell>
                    <TableCell align='center'>{seed.cultivar}</TableCell>
                    <TableCell align='center'>{seed.source}</TableCell>
                    <TableCell align='center'>{seed.year}</TableCell>
                    <TableCell align='center'>
                      {seed.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SeedStorage;
