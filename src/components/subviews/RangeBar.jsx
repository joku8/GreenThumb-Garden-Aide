import {
  Box,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import React from "react";
import { formatDateToMonthDay } from "../../utils/utils";

const FloatRangeBar = ({ start, end, width, height, shadedColor, info }) => {
  if (start < 0 || start > 366 || end < 0 || end > 366) {
    console.error("Invalid float range. Values should be between 0 and 366.");
    return null;
  }

  const minFloat = Math.min(start, end);
  const maxFloat = Math.max(start, end);

  const styles = {
    container: {
      position: "relative",
      width,
      height,
      overflow: "hidden",
    },
    rangeBar: {
      position: "absolute",
      top: 0,
      left: `${(minFloat / 366) * 100}%`,
      width: `${((maxFloat - minFloat) / 366) * 100}%`,
      height: "100%",
      backgroundColor: shadedColor,
      borderRadius: "10px",
    },
  };

  const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <div style={styles.container}>
      <StyledTooltip
        title={
          <Box marginBottom="0px">
            {" "}
            {/* Adjust the margin value as needed */}
            <Typography variant="overline">{info.action}</Typography>
            <Typography variant="body1">{`${formatDateToMonthDay(
              info.dates[0]
            )} to ${formatDateToMonthDay(info.dates[1])}`}</Typography>
          </Box>
        }
      >
        <div style={styles.rangeBar}></div>
      </StyledTooltip>
    </div>
  );
};

export default FloatRangeBar;
