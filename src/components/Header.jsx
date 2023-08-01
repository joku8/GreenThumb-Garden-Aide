import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useState, useEffect, useCallback } from "react";
import {
  writeDataToFile,
  generateSavePackage,
  writeToExistingFile,
  getExistingFileHandle,
  readFileContents,
  verifyObject,
} from "../utils/utils";

const styles = {
  background: "#6fa037",
  padding: "10px 20px 10px 20px",
  borderRadius: "20px",
};

const Header = ({
  seedBank,
  seedBankSetter,
  harvestBook,
  harvestBookSetter,
  taskItems,
  taskItemsSetter,
  calendarList,
  calendarListSetter,
  file,
  setFile,
  snackbar,
}) => {
  const [autosaveOn, setAutosaveOn] = useState(false);

  const toggleAutosave = useCallback(() => {
    setAutosaveOn((prevAutosave) => !prevAutosave);
  }, []);

  const saveState = useCallback(async () => {
    const data = generateSavePackage(
      seedBank,
      harvestBook,
      calendarList,
      taskItems
    );
    if (file === null) {
      const ret = await writeDataToFile(data);
      if (ret.status === true) {
        setFile(ret.content);
        snackbar("success", "File Created 🎉🎉🎉");
        return true;
      }
      return false;
    } else {
      const ret = await writeToExistingFile(file, data);
      if (ret.status === true) {
        return true;
      }
    }
    return false;
  }, [file, seedBank, harvestBook, setFile, snackbar, calendarList, taskItems]);

  useEffect(() => {
    let intervalId;

    if (autosaveOn) {
      // Start autosaving when autosaveOn is true
      intervalId = setInterval(async () => {
        const status = await saveState();
        if (!status) {
          toggleAutosave();
        }
      }, 2000); // Autosave every 2 seconds (2000 milliseconds)
    }

    return () => {
      // Clean up the interval when the component unmounts or when autosaveOn is toggled to false
      clearInterval(intervalId);
    };
  }, [autosaveOn, saveState, toggleAutosave]);

  const handleUpload = async () => {
    setAutosaveOn(false);
    const ret = await getExistingFileHandle();
    if (ret.status === true) {
      const curr = ret.content;
      const response = await readFileContents(curr);
      if (response.status === true) {
        try {
          const obj = JSON.parse(response.content);
          if (!verifyObject(obj)) {
            snackbar("warning", "File could not be uploaded...");
            return;
          }
          seedBankSetter(obj.seedStorage);
          harvestBookSetter(obj.harvestBook);
          taskItemsSetter(obj.taskList);
          calendarListSetter(obj.calendarItems);
          setFile(ret.content);
          toggleAutosave();
          snackbar(
            "success",
            "File uploaded successfuly 🌱🌱🌱 Let's get Growing!"
          );
        } catch (error) {
          snackbar("error", `Encountered error...${error.message}`);
        }
      }
    }
  };

  return (
    <Box sx={styles}>
      <Stack
        direction="row"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="h2"
          fontSize="40px"
          fontWeight="lighter"
          color="#ffffff"
        >
          GreenThumb Garden Assistant
        </Typography>
        <Stack
          direction="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            variant="contained"
            onClick={() => {
              handleUpload();
            }}
          >
            Upload
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              saveState();
            }}
          >
            Save
          </Button>
          <Tooltip
            title={file === null ? "Save a file to enable autosave" : ""}
          >
            <div>
              <Button
                variant="contained"
                disabled={file === null}
                onClick={toggleAutosave}
                style={{ width: "200px" }}
              >
                {autosaveOn ? "Autosave Enabled" : "Autosave Disabled"}
              </Button>
            </div>
          </Tooltip>
          {autosaveOn ? (
            <CircularProgress color="warning" size={35} />
          ) : (
            <RefreshIcon color="disabled" fontSize="large" />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
