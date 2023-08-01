import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Textarea from "@mui/joy/Textarea";

import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/utils";

const styles = {
  width: "100%",
  height: "540px",
  backgroundColor: "#f1f1f1",
  borderRadius: "20px",
};

const TaskManager = ({ tasks, setTasks, newTask }) => {
  const handleUpdateTask = (e, id) => {
    const { name, value } = e.target;
    setTasks((prevTask) =>
      prevTask.map((task) =>
        task.id === id ? { ...task, [name]: value } : task
      )
    );
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (uuid) => (event, isExpanded) => {
    setExpanded(isExpanded ? uuid : false);
  };

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
      setTasks((prev) => prev.filter((task) => task.id !== contextMenu.row.id));
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
              padding="10px 20px 10px 20px"
            >
              <Typography variant="h4" fontWeight="lighter" fontSize="28px">
                Task Manager
              </Typography>
              <IconButton
                onClick={() => {
                  newTask();
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} padding="10px 10px 10px 10px">
            <Box sx={{ height: "425px", overflow: "scroll" }}>
              {tasks.map((task) => (
                <Accordion
                  expanded={expanded === task.id}
                  onChange={handleChange(task.id)}
                  onContextMenu={(event) => handleContextMenu(event, task)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id={`${task.id}-summary`}
                  >
                    <Typography sx={{ width: "33%", flexShrink: 0 }}>
                      {formatDate(task.due)}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {task.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Textarea
                      color="primary"
                      disabled={false}
                      minRows={2}
                      placeholder="Add notes here..."
                      size="md"
                      variant="outlined"
                      name="notes"
                      value={task.notes}
                      onChange={(e) => {
                        handleUpdateTask(e, task.id);
                      }}
                    />
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
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

export default TaskManager;
