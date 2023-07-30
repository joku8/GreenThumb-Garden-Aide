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

const generateSavePackage = (seedStorage, harvestBook, calendarItems) => {
  return JSON.stringify({
    seedStorage: seedStorage,
    harvestBook: harvestBook,
    calendarItems: calendarItems,
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
  const hasCalendarItems = keys.includes("calendarItems");

  // Return true if both keys are present, otherwise return false
  return hasSeedStorage && hasHarvestBook && hasCalendarItems;
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

const computeDates = (data) => {
  const convertDateToDayCount = (dateArr) => {
    const [startDate, endDate] = dateArr;
    if (startDate === "" || endDate === "") {
      return [0, 0];
    }

    const parseDate = (dateStr) => {
      const [month, day] = dateStr.split("-").map(Number);
      return new Date(2023, month - 1, day);
    };

    const startOfYear = new Date(2023, 0, 1);
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    const daysFromStartOfYearStart = Math.floor(
      (start - startOfYear) / (1000 * 60 * 60 * 24)
    );
    const daysFromStartOfYearEnd = Math.floor(
      (end - startOfYear) / (1000 * 60 * 60 * 24)
    );

    return [daysFromStartOfYearStart, daysFromStartOfYearEnd];
  };

  const computedData = {};

  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i++) {
    const curr = data[keys[i]];
    computedData[keys[i]] = convertDateToDayCount(curr);
  }

  return computedData;
};

const verifyAndProcess = (obj, includes) => {
  // Ensure the object follows the required schema
  const isValidSchema =
    typeof obj === "object" &&
    obj !== null &&
    Object.keys(obj).length === 2 &&
    "plant" in obj &&
    "data" in obj &&
    typeof obj.data === "object" &&
    obj.data !== null &&
    Object.keys(obj.data).length === 4 &&
    "sow" in obj.data &&
    "transplant" in obj.data &&
    "grow" in obj.data &&
    "harvest" in obj.data;

  if (!isValidSchema) {
    return { status: false, content: "Incorrect schema" };
  }

  const checkDateOrder = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate > endDate) {
      return false; // Start date is after end date
    }

    return true; // Start date is before or equal to end date
  };

  const convertDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${month}-${day}`;
  };

  const verifiedData = {};

  let currYear = null;

  const keys = Object.keys(obj.data);

  for (let i = 0; i < keys.length; i++) {
    const curr = obj.data[keys[i]];
    // Check if you should include this interval
    if (includes[keys[i]] !== true) {
      verifiedData[keys[i]] = ["", ""];
      continue;
    }
    // Check if date is provided
    if (curr[0] === "" || curr[1] === "") {
      verifiedData[keys[i]] = ["", ""];
      continue;
    }
    // Check date order
    if (!checkDateOrder(curr[0], curr[1])) {
      return {
        status: false,
        content:
          "One or more end dates come before the corresponding start date...",
      };
    }
    // Ensure the year is the same across
    const [year0, month0, day0] = curr[0].split("-").map(Number);
    const [year1, month1, day1] = curr[1].split("-").map(Number);
    if (year0 !== year1) {
      return {
        status: false,
        content: "Please use the same year for all dates...",
      };
    } else {
      if (currYear === null) {
        currYear = year0;
      } else {
        if (currYear !== year0 || currYear !== year1) {
          return {
            status: false,
            content: "Please use the same year for all dates...",
          };
        }
      }
    }
    verifiedData[keys[i]] = [convertDate(curr[0]), convertDate(curr[1])];
  }

  return { status: true, content: { plant: obj.plant, data: verifiedData } };
};

export default verifyAndProcess;

export {
  computeDates,
  formatDate,
  generateSavePackage,
  getCurrentDateTimeAsId,
  getExistingFileHandle,
  objEquals,
  readFileContents,
  verifyAndProcess,
  verifyObject,
  writeDataToFile,
  writeToExistingFile,
};
