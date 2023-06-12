import React from 'react';
import styles from './App.css';
import Header from './components/Header';
import HarvestTracker from './components/HarvestTracker';
import Calendar from './components/Calendar';
import SeedStorage from './components/SeedStorage';
import TaskManager from './components/TaskManager';

function App() {
  return (
    <div>
      <Header />

      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <HarvestTracker />
        </div>
        <div className={styles.gridItem}>
          <Calendar />
        </div>
        <div className={styles.gridItem}>
          <SeedStorage />
        </div>
        <div className={styles.gridItem}>
          <TaskManager />
        </div>
      </div>

      {/* Add the rest of your app's content */}
    </div>
  );
}

export default App;