// utils.jsx

// Get current date-time for use as unique key
const getCurrentDateTimeAsId = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

const generateSavePackage = (seedStorage, harvestBook) => {
  return JSON.stringify({
    seedStorage: seedStorage,
    harvestBook: harvestBook,
  });
};

// Write data to File Handle and return the handle
// index.js
const writeDataToFile = async (data) => {
  try {
    const options = {
      types: [
        {
          description: "JSON Files",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    };

    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(data);
    await writable.close();
    console.log("Data written to the file successfully!");
    return { status: true, content: handle };
  } catch (error) {
    console.error("Error writing data to the file:", error);
    return { status: false, content: error.message };
  }
};

const writeToExistingFile = async (fileHandle, data) => {
  try {
    const writable = await fileHandle.createWritable();
    await writable.seek(0); // Move the pointer to the beginning of the file
    await writable.write(data); // Write the new data to the file
    await writable.close();
    console.log("Data overwritten in the file successfully!");
    return { status: true, content: fileHandle };
  } catch (error) {
    console.error("Error overwriting data to the file:", error);
    return { status: false, content: error.message };
  }
};

export {
  generateSavePackage,
  getCurrentDateTimeAsId,
  writeDataToFile,
  writeToExistingFile,
};
