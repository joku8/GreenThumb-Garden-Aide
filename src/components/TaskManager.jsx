import { Box, Typography, Paper, Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React from "react";

const styles = {
  width: "100%",
  height: "540px",
  backgroundColor: "#f1f1f1",
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
          padding="10px 20px 10px 20px"
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
