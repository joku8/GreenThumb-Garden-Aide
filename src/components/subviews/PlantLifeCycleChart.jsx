import { Stack } from "@mui/material";
import React from "react";
import FloatRangeBar from "./RangeBar";
import { computeDates } from "../../utils/utils";

const PlantLifecycleChart = ({ plant }) => {
  const computedDates = computeDates(plant.data);

  const sowInfo = {
    action: "Sow",
    dates: plant.data.sow,
  };

  const transplantInfo = {
    action: "Transplant",
    dates: plant.data.transplant,
  };

  const growInfo = {
    action: "Grow",
    dates: plant.data.grow,
  };

  const harvestInfo = {
    action: "Harvest",
    dates: plant.data.harvest,
  };

  return (
    <Stack direction="column" spacing={0}>
      <FloatRangeBar
        start={computedDates.sow[0]}
        end={computedDates.sow[1]}
        width="100%"
        height="8px"
        shadedColor="#90caf9"
        info={sowInfo}
      />
      <FloatRangeBar
        start={computedDates.transplant[0]}
        end={computedDates.transplant[1]}
        width="100%"
        height="8px"
        shadedColor="#a5d6a7"
        info={transplantInfo}
      />
      <FloatRangeBar
        start={computedDates.grow[0]}
        end={computedDates.grow[1]}
        width="100%"
        height="8px"
        shadedColor="#ffd700"
        info={growInfo}
      />
      <FloatRangeBar
        start={computedDates.harvest[0]}
        end={computedDates.harvest[1]}
        width="100%"
        height="8px"
        shadedColor="#ff7043"
        info={harvestInfo}
      />
    </Stack>
  );
};

export default PlantLifecycleChart;
