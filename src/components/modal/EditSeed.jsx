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

const EditSeed = ({
  showModal,
  handleCloseModal,
  collection,
  setCollection,
  changeableID,
  reset,
}) => {
  const [seedObj, setSeedObj] = useState({
    plant: "",
    cultivar: "",
    source: "",
    year: "",
    notes: "",
  });

  useEffect(() => {
    if (changeableID !== "") {
      setSeedObj(collection.find((item) => item.id === changeableID));
    }
  }, [collection, changeableID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSeedObj((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSave = () => {
    const foundObject = collection.find((item) => item.id === changeableID);

    if (foundObject) {
      // Merge the existing object with the updated properties using object spread
      const updatedObject = { ...foundObject, ...seedObj };
      // Find the index of the object in the array
      const index = collection.indexOf(foundObject);
      // Update the object in the original array
      collection[index] = updatedObject;
    }
    reset();
    handleCloseModal();
  };

  const seedSource = [
    "Baker Creek Heirloom Seeds",
    "Botanical Interests",
    "Burpee",
    "Johnny's Seeds",
    "MIgardener",
    "Renee's Garden",
    "True Leaf Market",
  ];

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
              Edit Seed Entry
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Plant"
              name="plant"
              value={seedObj.plant}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cultivar"
              name="cultivar"
              value={seedObj.cultivar}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              freeSolo
              options={seedSource}
              onInputChange={(event, newValue) => {
                setSeedObj((prevValues) => ({
                  ...prevValues,
                  source: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Source" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Year"
              name="year"
              value={seedObj.year}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              name="notes"
              value={seedObj.notes}
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

export default EditSeed;
