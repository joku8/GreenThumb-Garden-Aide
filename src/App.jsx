import { Grid } from "@mui/material";

import React, { useState } from "react";
import Header from "./components/Header";
import HarvestTracker from "./components/HarvestTracker";
import Calendar from "./components/Calendar";
import SeedStorage from "./components/SeedStorage";
import TaskManager from "./components/TaskManager";
import AddSeed from "./components/modal/AddSeed";
import AddHarvest from "./components/modal/AddHarvest";

import { v4 as uuidv4 } from "uuid";
import Feedback from "./utils/Feedback";
import { getCurrentDateTimeAsId } from "./utils/utils";
import EditSeed from "./components/modal/EditSeed";
import EditHarvest from "./components/modal/EditHarvest";
import AddCalendar from "./components/modal/AddCalendar";

function App() {
  // Global Snackbar
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarKey, setSnackbarKey] = useState(0); // To manage the key prop

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const showCustomSnackbar = (severity, message) => {
    setSeverity(severity);
    setMessage(message);
    setSnackbarKey((prevKey) => prevKey + 1); // Update the key to trigger Snackbar replacement
    setShowSnackbar(true);
  };

  // File Hanlde Storage
  const [fileHandle, setFileHandle] = useState(null);

  /** Stores the seeds stored
   *  Array of objects with the following keys:
   *  Plant, Cultivar, Source, Year, Notes
   */
  const [seedBank, setSeedBank] = useState([]);
  const addToSeedBank = (seedObject) => {
    const addObject = {
      id: uuidv4(),
      create: getCurrentDateTimeAsId(),
      plant: seedObject.plant,
      cultivar: seedObject.cultivar,
      source: seedObject.source,
      year: seedObject.year,
      notes: seedObject.notes,
    };
    setSeedBank((prevSeedBank) => [...prevSeedBank, addObject]);
    showCustomSnackbar("success", "Seed added to the bank 🌾 !!");
  };

  const [showAddSeed, setShowAddSeed] = useState(false);
  const handleOpenAddSeed = () => {
    setShowAddSeed(true);
  };
  const handleCloseAddSeed = () => {
    setShowAddSeed(false);
  };

  const [showEditSeed, setShowEditSeed] = useState(false);
  const handleOpenEditSeed = () => {
    setShowEditSeed(true);
  };
  const handleCloseEditSeed = () => {
    setShowEditSeed(false);
  };

  const [editSeedID, setEditSeedID] = useState("");
  const resetEditSeedID = () => {
    setEditSeedID("");
  };

  const editSeed = (id) => {
    handleOpenEditSeed();
    setEditSeedID(id);
  };

  /** Stores garden harvest
   *  Array of objects with the following keys:
   *  Item, Date, Quantity, Units, Notes
   */
  const [harvestBook, setHarvestBook] = useState([]);
  const addToHarvestBook = (harvestObject) => {
    const addObject = {
      id: uuidv4(),
      create: getCurrentDateTimeAsId(),
      item: harvestObject.item,
      date: harvestObject.date,
      quantity: harvestObject.quantity,
      units: harvestObject.units,
      notes: harvestObject.notes,
    };
    setHarvestBook((prevHarvestBook) => [...prevHarvestBook, addObject]);
    showCustomSnackbar("success", "Harvest recorded 🧑🏼‍🌾 !!");
  };

  const [showAddHarvest, setShowAddHarvest] = useState(false);
  const handleOpenAddHarvest = () => {
    setShowAddHarvest(true);
  };
  const handleCloseAddHarvest = () => {
    setShowAddHarvest(false);
  };

  const [showEditHarvest, setShowEditHarvest] = useState(false);
  const handleOpenEditHarvest = () => {
    setShowEditHarvest(true);
  };
  const handleCloseEditHarvest = () => {
    setShowEditHarvest(false);
  };

  const [editHarvestID, setEditHarvestID] = useState("");
  const resetEditHarvestID = () => {
    setEditHarvestID("");
  };

  const editHarvest = (id) => {
    handleOpenEditHarvest();
    setEditHarvestID(id);
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
  const addCalendarItem = (item) => {
    const addObject = {
      id: uuidv4(),
      create: getCurrentDateTimeAsId(),
      plant: item.plant,
      data: item.data,
    };
    setCalendarItems((prev) => [...prev, addObject]);
    showCustomSnackbar("success", "Calendar item added successfully 📅 !!!");
  };

  const [showAddCalendar, setShowAddCalendar] = useState(false);
  const handleOpenAddCalendar = () => {
    setShowAddCalendar(true);
  };
  const handleCloseAddCalendar = () => {
    setShowAddCalendar(false);
  };

  return (
    <div>
      <Grid container spacing={3} padding="20px 40px 10px 40px">
        <Grid item xs={12}>
          <Header
            seedBank={seedBank}
            seedBankSetter={setSeedBank}
            harvestBook={harvestBook}
            harvestBookSetter={setHarvestBook}
            calendarList={calendarItems}
            calendarListSetter={setCalendarItems}
            file={fileHandle}
            setFile={setFileHandle}
            snackbar={showCustomSnackbar}
          />
        </Grid>
        <Grid item xs={6}>
          <SeedStorage
            seeds={seedBank}
            setSeeds={setSeedBank}
            addSeed={handleOpenAddSeed}
            seedEditable={editSeed}
          />
        </Grid>
        <Grid item xs={6}>
          <HarvestTracker
            harvest={harvestBook}
            setHarvest={setHarvestBook}
            addHarvest={handleOpenAddHarvest}
            harvestEditable={editHarvest}
          />
        </Grid>
        <Grid item xs={8}>
          <Calendar
            calendarList={calendarItems}
            setCalendarList={setCalendarItems}
            addCalendar={handleOpenAddCalendar}
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
      <EditSeed
        showModal={showEditSeed}
        handleCloseModal={handleCloseEditSeed}
        collection={seedBank}
        setCollection={setSeedBank}
        changeableID={editSeedID}
        reset={resetEditSeedID}
      />
      <AddHarvest
        showModal={showAddHarvest}
        handleCloseModal={handleCloseAddHarvest}
        addHarvestObj={addToHarvestBook}
      />
      <EditHarvest
        showModal={showEditHarvest}
        handleCloseModal={handleCloseEditHarvest}
        collection={harvestBook}
        setCollection={setHarvestBook}
        changeableID={editHarvestID}
        reset={resetEditHarvestID}
      />
      <AddCalendar
        showModal={showAddCalendar}
        handleCloseModal={handleCloseAddCalendar}
        addCalendarObj={addCalendarItem}
        snackbar={showCustomSnackbar}
      />
      <Feedback
        feedbackKey={snackbarKey}
        open={showSnackbar}
        severity={severity}
        message={message}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}

export default App;
