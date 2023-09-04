import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";
import Cell from "./Cell";
import { levels } from "../util/levels";

const Maze = ({ playerPosition, setPlayerPosition, level, changeLevel, toogleMenu, resetPlayerPos }) => {
  const { cellWidth, cellHeight } = useMemo(() => {
    return {
      cellWidth: Dimensions.get("window").width / (levels[level].maze[0].length || 1),
      cellHeight: (Dimensions.get("window").height / (levels[level].maze.length || 1)) * 0.6,
    };
  }, [level]);

  useEffect(() => {
    setPlayerPosition(levels[level].startPos);
  }, [level, resetPlayerPos]);

  const handleMove = (dx, dy) => {
    const newPosX = playerPosition.x + dx;
    const newPosY = playerPosition.y + dy;

    // Check for collision with walls
    if (levels[level].maze[newPosY] && levels[level].maze[newPosY][newPosX] && levels[level].maze[newPosY][newPosX] !== 0) {
      setPlayerPosition({ x: newPosX, y: newPosY });

      // Check for win condition
      if (levels[level].maze[newPosY][newPosX] === 2) {
        // Implement your win logic here
        level !== levels.length - 1 ? changeLevel(level + 1) : toogleMenu("reset");
      }
    } else {
      // TODO: VIRACAO AQUI
    }
  };

  const onGestureEvent = (event) => {
    const { translationX, translationY, state } = event.nativeEvent;

    const swipeThreshold = 20; // Adjust this value to control swipe sensitivity

    if (state === State.END) {
      if (Math.abs(translationX) > swipeThreshold) {
        handleMove(translationX > 0 ? 1 : -1, 0);
      } else if (Math.abs(translationY) > swipeThreshold) {
        handleMove(0, translationY > 0 ? 1 : -1);
      }
    }
  };

  return (
    <GestureHandlerRootView>
      <PanGestureHandler onEnded={onGestureEvent}>
        <View style={styles.maze}>
          {levels[level].maze.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Cell
                  key={`${rowIndex}-${columnIndex}`}
                  type={cell}
                  playerPosition={playerPosition}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  width={cellWidth}
                  height={cellHeight}
                />
              ))}
            </View>
          ))}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  maze: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "black",
    gap: -1,
  },
  row: {
    flexDirection: "row",
  },
});

export default Maze;
