import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useState, useEffect } from "react";

import "./contextMenu.css";
import { objEquals } from "../utils/utils";

const styles = {
  width: "95%",
  height: "350px",
  padding: "10px 20px 10px 20px",
  backgroundColor: "#e5e5e5",
  borderRadius: "20px",
  overflow: "scroll",
};

const SeedStorage = ({ seeds, setSeeds, addSeed }) => {
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
      setSeeds((prevSeeds) =>
        prevSeeds.filter((seed) => !objEquals(seed, contextMenu.row))
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
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h4" fontSize="28px" fontWeight="lighter">
                Seed Storage
              </Typography>
              <IconButton
                onClick={() => {
                  addSeed();
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
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
                        width: "20%",
                      }}
                    >
                      Plant
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      Cultivar
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      Source
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "10%",
                      }}
                    >
                      Year
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "30%",
                      }}
                    >
                      Notes
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {seeds.map((seed) => (
                    <TableRow
                      key={seed.id}
                      onContextMenu={(event) => handleContextMenu(event, seed)}
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
                        {seed.plant}
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
                        {seed.cultivar}
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
                        {seed.source}
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
                        {seed.year}
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
                        {seed.notes}
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

export default SeedStorage;
