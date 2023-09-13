import React from "react";
import { View, StyleSheet } from "react-native";

const Cell = ({ type, playerPosition, rowIndex, columnIndex, width, height }) => {
  let cellStyle = styles.default;
  const isPlayer = playerPosition.y === rowIndex && playerPosition.x === columnIndex;

  if (type === 0) {
    cellStyle = { ...cellStyle, ...styles.wall };
  } else if (type === 2) {
    cellStyle = { ...cellStyle, ...styles.goal };
  }

  return <View style={{ ...cellStyle, width, height }}>{isPlayer ? <View style={{ ...styles.player, width: 30, height: 30 }} /> : <></>}</View>;
};

const styles = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
  },
  wall: {
    backgroundColor: "black",
  },
  goal: {
    backgroundColor: "green",
  },
  player: {
    backgroundColor: "blue",
    borderRadius: 99999,
  },
});

export default Cell;
