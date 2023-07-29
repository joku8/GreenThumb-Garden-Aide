import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";

import React, { useState, useEffect, useCallback } from "react";
import {
  writeDataToFile,
  generateSavePackage,
  writeToExistingFile,
  getExistingFileHandle,
} from "../utils/utils";

const styles = {
  background: "#6fa037",
  padding: "10px 20px 10px 20px",
  borderRadius: "20px",
};

const Header = ({ seedBank, harvestBook, file, setFile, snackbar }) => {
  const [autosaveOn, setAutosaveOn] = useState(false);

  const toggleAutosave = useCallback(() => {
    setAutosaveOn((prevAutosave) => !prevAutosave);
  }, []);

  const saveState = useCallback(async () => {
    const data = generateSavePackage(seedBank, harvestBook);
    if (file === null) {
      const ret = await writeDataToFile(data);
      if (ret.status === true) {
        setFile(ret.content);
        snackbar("success", "File Created 🎉🎉🎉");
        return true;
      }
    } else {
      const ret = await writeToExistingFile(file, data);
      if (ret.status === true) {
        return true;
      }
    }
    return false;
  }, [file, seedBank, harvestBook, setFile, snackbar]);

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
    const ret = await getExistingFileHandle();
    if (ret.status === true) {
      setFile(ret.content);
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
