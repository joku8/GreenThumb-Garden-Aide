import React from "react";

const FloatRangeBar = ({ start, end, width, height, shadedColor }) => {
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

  return (
    <div style={styles.container}>
      <div style={styles.rangeBar}></div>
    </div>
  );
};

export default FloatRangeBar;
