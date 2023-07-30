import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Grid,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Table,
  TableHead,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PlantLifecycleChart from "./subviews/PlantLifeCycleChart";

const styles = {
  width: "95%",
  height: "500px",
  padding: "10px 20px 10px 20px",
  backgroundColor: "#f1f1f1",
  borderRadius: "20px",
};

const Calendar = ({
  calendarList,
  setCalendarList,
  addCalendar,
  calendarEditable,
}) => {

  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
      setCalendarList((prev) =>
        prev.filter((item) => item.id !== contextMenu.row.id)
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
        <Grid container>
          <Grid item xs={12}>
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
                  addCalendar();
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              sx={{ height: "425px", overflow: "scroll" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        Plant
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        width: "80%",
                      }}
                    >
                      <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                        {monthAbbreviations.map((month) => (
                          <Typography
                            variant="body1"
                            fontWeight="lighter"
                            key={month}
                            style={{ width: "8%" }}
                          >
                            {month}
                          </Typography>
                        ))}
                      </Stack>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calendarList.map((curr) => (
                    <TableRow
                      key={curr.id}
                      onContextMenu={(event) => handleContextMenu(event, curr)}
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
                        {curr.plant}
                      </TableCell>
                      <TableCell align="center">
                        <PlantLifecycleChart plant={curr} />
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
          <div className="item" onClick={handleDeleteRow}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
