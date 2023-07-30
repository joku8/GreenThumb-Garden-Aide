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
    return { status: true, content: handle };
  } catch (error) {
    return { status: false, content: error.message };
  }
};

const writeToExistingFile = async (fileHandle, data) => {
  try {
    const writable = await fileHandle.createWritable();
    await writable.seek(0); // Move the pointer to the beginning of the file
    await writable.write(data); // Write the new data to the file
    await writable.close();
    return { status: true, content: fileHandle };
  } catch (error) {
    return { status: false, content: error.message };
  }
};

const getExistingFileHandle = async () => {
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

    const [fileHandle] = await window.showOpenFilePicker(options);
    return { status: true, content: fileHandle };
  } catch (error) {
    return { status: false, content: error.message };
  }
};

const readFileContents = async (fileHandle) => {
  try {
    const file = await fileHandle.getFile();
    const contents = await file.text();
    return { status: true, content: contents };
  } catch (error) {
    return { status: false, content: null };
  }
};

function objEquals(a, b) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Check if the objects have the same number of keys
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Check if all keys in object A are present in object B and have the same values
  for (const key of keysA) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  // If all checks pass, the objects are considered equal
  return true;
}

const verifyObject = (obj) => {
  const keys = Object.keys(obj);

  // Check if the object has 'seedStorage' and 'harvestBook' keys
  const hasSeedStorage = keys.includes("seedStorage");
  const hasHarvestBook = keys.includes("harvestBook");

  // Return true if both keys are present, otherwise return false
  return hasSeedStorage && hasHarvestBook;
};

const formatDate = (dateString) => {
  const months = [
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

  const date = new Date(dateString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

export {
  formatDate,
  generateSavePackage,
  getCurrentDateTimeAsId,
  getExistingFileHandle,
  objEquals,
  readFileContents,
  verifyObject,
  writeDataToFile,
  writeToExistingFile,
};
