import { Grid } from "@mui/material";

import React, { useState } from "react";
import Header from "./components/Header";
import HarvestTracker from "./components/HarvestTracker";
import Calendar from "./components/Calendar";
import SeedStorage from "./components/SeedStorage";
import TaskManager from "./components/TaskManager";
import AddSeed from "./components/modal/AddSeed";
import AddHarvest from "./components/modal/AddHarvest";

import { getCurrentDateTimeAsId } from "./utils";

function App() {
  /** Stores the seeds stored
   *  Array of objects with the following keys:
   *  Plant, Cultivar, Source, Year, Notes
   */
  const [seedBank, setSeedBank] = useState([]);
  const addToSeedBank = (seedObject) => {
    const addObject = {
      id: getCurrentDateTimeAsId,
      plant: seedObject.plant,
      cultivar: seedObject.cultivar,
      source: seedObject.source,
      year: seedObject.year,
      notes: seedObject.notes,
    };
    setSeedBank((prevSeedBank) => [...prevSeedBank, addObject]);
  };

  const [showAddSeed, setShowAddSeed] = useState(false);
  const handleOpenAddSeed = () => {
    setShowAddSeed(true);
  };
  const handleCloseAddSeed = () => {
    setShowAddSeed(false);
  };

  /** Stores garden harvest
   *  Array of objects with the following keys:
   *  Item, Date, Quantity, Units, Notes
   */
  const [harvestBook, setHarvestBook] = useState([]);
  const addToHarvestBook = (harvestObject) => {
    const addObject = {
      id: getCurrentDateTimeAsId,
      item: harvestObject.item,
      date: harvestObject.date,
      quantity: harvestObject.quantity,
      units: harvestObject.units,
      notes: harvestObject.notes,
    };
    setHarvestBook((prevHarvestBook) => [...prevHarvestBook, addObject]);
  };

  const [showAddHarvest, setShowAddHarvest] = useState(false);
  const handleOpenAddHarvest = () => {
    setShowAddHarvest(true);
  };
  const handleCloseAddHarvest = () => {
    setShowAddHarvest(false);
  };

  /** Stores garden tasks
   *  Array of objects with the following keys:
   *  Todo, Due, Notes
   */
  const [taskList, setTaskList] = useState([]);

  /** Stores calendar items
   *  Array of objects with the following keys:
   *  Plant, periods (an array of objects showing dates. For example march 15 - april 10: sow, april 10 - June 10 harvest, etc.)
   */
  const [calendarItems, setCalendarItems] = useState([]);

  return (
    <div>
      <Grid container spacing={3} padding="20px 40px 10px 40px">
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={6}>
          <SeedStorage seeds={seedBank} addSeed={handleOpenAddSeed} />
        </Grid>
        <Grid item xs={6}>
          <HarvestTracker
            harvest={harvestBook}
            addHarvest={handleOpenAddHarvest}
          />
        </Grid>
        <Grid item xs={8}>
          <Calendar
            calendarList={calendarItems}
            setCalendarList={setCalendarItems}
          />
        </Grid>
        <Grid item xs={4}>
          <TaskManager tasks={taskList} setTasks={setTaskList} />
        </Grid>
      </Grid>
      <AddSeed
        showModal={showAddSeed}
        handleCloseModal={handleCloseAddSeed}
        addSeedObj={addToSeedBank}
      />
      <AddHarvest
        showModal={showAddHarvest}
        handleCloseModal={handleCloseAddHarvest}
        addHarvestObj={addToHarvestBook}
      />
    </div>
  );
}

export default App;
