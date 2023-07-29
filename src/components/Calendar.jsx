import React from "react";
import { Box, Typography, Paper, Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const styles = {
  width: "95%",
  height: "350px",
  padding: "10px 20px 10px 20px",
  backgroundColor: "#e5e5e5",
  borderRadius: "20px",
};

const Calendar = () => {
  return (
    <div>
      <Box component={Paper} elevation={2} sx={styles}>
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" fontSize="28px" fontWeight="lighter">
            Calendar
          </Typography>
          <IconButton
            onClick={() => {
              console.log("Add Seed Storage");
            }}
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Stack>
      </Box>
    </div>
  );
};

export default Calendar;
