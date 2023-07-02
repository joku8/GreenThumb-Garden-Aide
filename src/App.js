import { 
  Grid
} from '@mui/material';

import React from 'react';
import Header from './components/Header';
import HarvestTracker from './components/HarvestTracker';
import Calendar from './components/Calendar';
import SeedStorage from './components/SeedStorage';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <div>
      <Grid container 
      spacing={3}
      padding="20px 40px 10px 40px"
      >
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6}>
          <SeedStorage />
        </Grid>
        <Grid item xs={6}>
          <HarvestTracker />
        </Grid>
        <Grid item xs={8}>
          <Calendar />
        </Grid>
        <Grid item xs={4}>
          <TaskManager />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;