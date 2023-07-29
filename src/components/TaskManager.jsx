import { Box, Typography, Paper, Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React from "react";

const styles = {
  width: "93%",
  height: "350px",
  padding: "10px 20px 10px 20px",
  backgroundColor: "#e5e5e5",
  borderRadius: "20px",
};

const TaskManager = () => {
  // Component logic and state management can be added here
  return (
    <div>
      <Box component={Paper} elevation={2} sx={styles}>
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontWeight="lighter" fontSize="28px">
            Task Manager
          </Typography>
          <IconButton
            onClick={() => {
              console.log("Add Task");
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Box>
    </div>
  );
};

export default TaskManager;
