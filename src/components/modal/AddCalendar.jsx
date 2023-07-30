import {
  Modal,
  TextField,
  Box,
  Grid,
  Typography,
  Stack,
  Checkbox,
  Button,
} from "@mui/material";

import React, { useState } from "react";
import verifyAndProcess, { computeDates } from "../../utils/utils";

const boxStyle = {
  backgroundColor: "#ffffff", // White background
  width: "40%", // 40% width of the viewport
  height: "60%", // 40% height of the viewport
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
  borderRadius: "10px",
  overflow: "scroll",
};

const AddCalendar = ({ showModal, handleCloseModal, addCalendarObj }) => {
  const [checkedSow, setCheckedSow] = React.useState(true);
  const handleChangeCheckedSow = (event) => {
    setCheckedSow(event.target.checked);
  };

  const [checkedTransplant, setCheckedTransplant] = React.useState(true);
  const handleChangeCheckedTransplant = (event) => {
    setCheckedTransplant(event.target.checked);
  };

  const [checkedGrow, setCheckedGrow] = React.useState(true);
  const handleChangeCheckedGrow = (event) => {
    setCheckedGrow(event.target.checked);
  };

  const [checkedHarvest, setCheckedHarvest] = React.useState(true);
  const handleChangeCheckedHarvest = (event) => {
    setCheckedHarvest(event.target.checked);
  };

  const [calendarObj, setCalendarObj] = useState({
    plant: "",
    data: {
      sow: ["", ""],
      transplant: ["", ""],
      grow: ["", ""],
      harvest: ["", ""],
    },
  });

  const handleInputChange = (event, fieldName, index) => {
    const newValue = event.target.value;
    setCalendarObj((prevcalendarObj) => ({
      ...prevcalendarObj,
      data: {
        ...prevcalendarObj.data,
        [fieldName]: prevcalendarObj.data[fieldName].map((item, i) =>
          i === index ? newValue : item
        ),
      },
    }));
  };

  const handleSubmit = () => {
    const includes = {
      sow: checkedSow,
      transplant: checkedTransplant,
      grow: checkedGrow,
      harvest: checkedHarvest,
    };
    const processed = verifyAndProcess(calendarObj, includes);
    if (processed.status === true) {
      addCalendarObj(processed.content);
      handleCloseModal();
      setCalendarObj({
        plant: "",
        data: {
          sow: ["", ""],
          transplant: ["", ""],
          grow: ["", ""],
          harvest: ["", ""],
        },
      });
      setCheckedSow(true);
      setCheckedTransplant(true);
      setCheckedGrow(true);
      setCheckedHarvest(true);
    } else {
      // Snackbar alert here
    }
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Box sx={boxStyle}>
        <Grid
          container
          display="flex"
          alignContent="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <Typography variant="h5" display="flex" justifyContent="center">
              Add an Item to the Calendar
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Plant"
              value={calendarObj.plant}
              onChange={(e) =>
                setCalendarObj({ ...calendarObj, plant: e.target.value })
              }
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={6}
            display="flex"
            justifyContent="right"
            alignItems="center"
          >
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              border="2px solid #90caf9"
              borderRadius="10px"
              p={2}
              display="flex"
              alignItems="center"
            >
              <Grid item xs={4} display="flex" alignItems="center">
                <Stack
                  direction="row"
                  spacing={2}
                  display="flex"
                  justifyContent="left"
                  alignItems="center"
                >
                  <Checkbox
                    checked={checkedSow}
                    onChange={(e) => {
                      handleChangeCheckedSow(e);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography variant="h6">Sow</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="Start"
                  type="date"
                  disabled={!checkedSow}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.sow[0]}
                  onChange={(e) => handleInputChange(e, "sow", 0)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="End"
                  type="date"
                  disabled={!checkedSow}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.sow[1]}
                  onChange={(e) => handleInputChange(e, "sow", 1)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              border="2px solid #a5d6a7"
              borderRadius="10px"
              p={2}
              display="flex"
              alignItems="center"
            >
              <Grid item xs={4} display="flex" alignItems="center">
                <Stack
                  direction="row"
                  spacing={2}
                  display="flex"
                  justifyContent="left"
                  alignItems="center"
                >
                  <Checkbox
                    checked={checkedTransplant}
                    onChange={(e) => {
                      handleChangeCheckedTransplant(e);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography variant="h6">Transplant</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="Start"
                  type="date"
                  disabled={!checkedTransplant}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.transplant[0]}
                  onChange={(e) => handleInputChange(e, "transplant", 0)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="End"
                  type="date"
                  disabled={!checkedTransplant}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.transplant[1]}
                  onChange={(e) => handleInputChange(e, "transplant", 1)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              border="2px solid #ffd700"
              borderRadius="10px"
              p={2}
              display="flex"
              alignItems="center"
            >
              <Grid item xs={4} display="flex" alignItems="center">
                <Stack
                  direction="row"
                  spacing={2}
                  display="flex"
                  justifyContent="left"
                  alignItems="center"
                >
                  <Checkbox
                    checked={checkedGrow}
                    onChange={(e) => {
                      handleChangeCheckedGrow(e);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography variant="h6">Grow</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="Start"
                  type="date"
                  disabled={!checkedGrow}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.grow[0]}
                  onChange={(e) => handleInputChange(e, "grow", 0)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="End"
                  type="date"
                  disabled={!checkedGrow}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.grow[1]}
                  onChange={(e) => handleInputChange(e, "grow", 1)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              border="2px solid #ff7043"
              borderRadius="10px"
              p={2}
              display="flex"
              alignItems="center"
            >
              <Grid item xs={4} display="flex" alignItems="center">
                <Stack
                  direction="row"
                  spacing={2}
                  display="flex"
                  justifyContent="left"
                  alignItems="center"
                >
                  <Checkbox
                    checked={checkedHarvest}
                    onChange={(e) => {
                      handleChangeCheckedHarvest(e);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography variant="h6">Harvest</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="Start"
                  type="date"
                  disabled={!checkedHarvest}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.harvest[0]}
                  onChange={(e) => handleInputChange(e, "harvest", 0)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  label="End"
                  type="date"
                  disabled={!checkedHarvest}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={calendarObj.data.harvest[1]}
                  onChange={(e) => handleInputChange(e, "harvest", 1)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddCalendar;
