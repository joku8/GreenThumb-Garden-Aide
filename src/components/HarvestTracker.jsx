import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useState, useEffect } from "react";

const styles = {
  height: "350px",
  padding: "10px 20px 10px 20px",
  backgroundColor: "#e5e5e5",
  borderRadius: "20px",
};

const HarvestTracker = ({ harvest, setHarvest, addHarvest }) => {
  // Component logic and state management can be added here
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event, row) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      row: row,
    });
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const handleDeleteRow = () => {
    if (contextMenu && contextMenu.row) {
      setHarvest((prevHarvest) =>
        prevHarvest.filter((harvest) => harvest.id !== contextMenu.row.id)
      );
      handleContextMenuClose(); // Close the context menu
    }
  };

  useEffect(() => {
    const handleClickAway = () => {
      if (contextMenu) {
        handleContextMenuClose();
      }
    };

    document.addEventListener("click", handleClickAway);

    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, [contextMenu]);

  return (
    <div>
      <Box component={Paper} elevation={2} sx={styles}>
        <Grid container spacing={1} sx={{ width: "100%" }}>
          <Grid item xs={12} sx={{ width: "100%" }}>
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
          <Grid item xs={12} sx={{ width: "100%" }}>
            <TableContainer
              component={Paper}
              sx={{ height: "290px", overflow: "scroll" }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "30%",
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "15%",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "10%",
                      }}
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "10%",
                      }}
                    >
                      Units
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "45%",
                      }}
                    >
                      Notes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {harvest.map((instance) => (
                    <TableRow
                      key={instance.id}
                      onContextMenu={(event) =>
                        handleContextMenu(event, instance)
                      }
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        align="center"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "50px",
                        }}
                      >
                        {instance.item}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "50px",
                        }}
                      >
                        {instance.date}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "50px",
                        }}
                      >
                        {instance.quantity}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "50px",
                        }}
                      >
                        {instance.units}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "50px",
                        }}
                      >
                        {instance.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      {contextMenu && (
        <div
          id="context-menu"
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
          }}
        >
          <div class="item" onClick={handleDeleteRow}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default HarvestTracker;
