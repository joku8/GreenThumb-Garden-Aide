import { Modal, TextField, Button, Box, Grid, Typography } from "@mui/material";

import React, { useState } from "react";

const boxStyle = {
  backgroundColor: "#ffffff", // White background
  width: "30%", // 40% width of the viewport
  height: "20%", // 40% height of the viewport
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

const AddTask = ({ showModal, handleCloseModal, addTaskItem }) => {
  const [taskObj, setTaskObj] = useState({
    due: "",
    title: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskObj((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = () => {
    addTaskItem(taskObj);
    handleCloseModal();
    setTaskObj({
      due: "",
      title: "",
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
              Add Task Item
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Title"
              placeholder="Untitled task"
              name="title"
              value={taskObj.title}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Due date"
              name="due"
              InputLabelProps={{
                shrink: true,
              }}
              value={taskObj.due}
              type="date"
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

export default AddTask;
