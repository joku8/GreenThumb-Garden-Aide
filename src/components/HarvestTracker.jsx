import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React from "react";

const styles = {
  width: "95%",
  height: "350px",
  padding: "10px 20px 10px 20px",
  backgroundColor: "#e5e5e5",
  borderRadius: "20px",
};

const HarvestTracker = ({ harvest, addHarvest }) => {
  // Component logic and state management can be added here

  console.log(harvest);

  return (
    <div>
      <Box component={Paper} elevation={2} sx={styles}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h4" fontWeight="lighter">
                Harvest Tracker
              </Typography>
              <IconButton
                onClick={() => {
                  addHarvest();
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Table component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Item
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Units
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Notes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {harvest.map((instance) => (
                  <TableRow key={instance.id}>
                    <TableCell align="center">{instance.item}</TableCell>
                    <TableCell align="center">{instance.date}</TableCell>
                    <TableCell align="center">{instance.quanity}</TableCell>
                    <TableCell align="center">{instance.units}</TableCell>
                    <TableCell align="center">{instance.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HarvestTracker;
