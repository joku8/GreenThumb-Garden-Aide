import { Modal, TextField, Button, Box, Grid, Typography } from "@mui/material";

import React, { useState } from "react";

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
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
  borderRadius: "10px",
  overflow: "scroll",
};

const AddSeed = ({ showModal, handleCloseModal, addHarvestObj }) => {
  const [harvestObj, setHarvestObj] = useState({
    item: "",
    date: "",
    quantity: "",
    units: "",
    notes: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setHarvestObj((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = () => {
    addHarvestObj(harvestObj);
    handleCloseModal();
    setHarvestObj({
      item: "",
      date: "",
      quantity: "",
      units: "",
      notes: "",
    });
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
              Add Your Harvest to Storage!
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Item"
              name="item"
              value={harvestObj.plant}
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
              value={harvestObj.cultivar}
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
            <TextField
              label="Units"
              name="units"
              value={harvestObj.units}
              onChange={handleInputChange}
              fullWidth
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
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddSeed;
