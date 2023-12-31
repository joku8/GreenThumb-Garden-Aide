import {
  Modal,
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Autocomplete,
} from "@mui/material";

import React, { useState, useEffect } from "react";

const boxStyle = {
  backgroundColor: "#ffffff", // White background
  width: "40%", // 40% width of the viewport
  height: "40%", // 40% height of the viewport
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  padding: "30px",
  borderRadius: "10px",
  overflow: "scroll",
};

const EditHarvest = ({
  showModal,
  handleCloseModal,
  collection,
  setCollection,
  changeableID,
  reset,
}) => {
  const [harvestObj, setHarvestObj] = useState({
    item: "",
    date: "",
    quantity: "",
    units: "",
    notes: "",
  });

  useEffect(() => {
    if (changeableID !== "") {
      setHarvestObj(collection.find((item) => item.id === changeableID));
    }
  }, [collection, changeableID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHarvestObj((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSave = () => {
    const foundObject = collection.find((item) => item.id === changeableID);

    if (foundObject) {
      // Merge the existing object with the updated properties using object spread
      const updatedObject = { ...foundObject, ...harvestObj };
      // Find the index of the object in the array
      const index = collection.indexOf(foundObject);
      // Update the object in the original array
      collection[index] = updatedObject;
    }
    reset();
    handleCloseModal();
  };

  const unitOptions = ["lb", "oz", "kg", "g", "count"];

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
              Edit Harvest Entry
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Item"
              name="item"
              value={harvestObj.item}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={harvestObj.date}
              type="date"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              value={harvestObj.quantity}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              freeSolo
              options={unitOptions}
              onInputChange={(event, newValue) => {
                setHarvestObj((prevValues) => ({
                  ...prevValues,
                  units: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Units" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              value={harvestObj.notes}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="right">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditHarvest;
