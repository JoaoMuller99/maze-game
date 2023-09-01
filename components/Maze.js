import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {GestureHandlerRootView, PanGestureHandler, State} from 'react-native-gesture-handler';
import Cell from './Cell';

const mazeData = [
    // Define your maze layout here (0: empty, 1: wall, 2: goal)
    [0, 0, 0, 0, 2],
    [1, 0, 0, 1, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1],
];

const Maze = () => {
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 4 });

    const handleMove = (dx, dy) => {
        const newPosX = playerPosition.x + dx;
        const newPosY = playerPosition.y + dy;

        // Check for collision with walls
        if (mazeData[newPosY] && mazeData[newPosY][newPosX] && mazeData[newPosY][newPosX] !== 0) {
            setPlayerPosition({ x: newPosX, y: newPosY });

            // Check for win condition
            if (mazeData[newPosY][newPosX] === 2) {
                // Implement your win logic here
                alert('Congratulations, you won!');
            }
        }
    };

    const onGestureEvent = (event) => {
        const { translationX, translationY, state } = event.nativeEvent;

        const swipeThreshold = 30; // Adjust this value to control swipe sensitivity

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
                    {mazeData.map((row, rowIndex) =>
                        <View key={rowIndex} style={styles.row}>
                            {row.map((cell, columnIndex) => (
                                <Cell
                                    key={`${rowIndex}-${columnIndex}`}
                                    type={cell}
                                    playerPosition={playerPosition}
                                    rowIndex={rowIndex}
                                    columnIndex={columnIndex}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    maze: {
        flexDirection: 'column',
        borderWidth:1,
        borderColor:"black"
    },
    row:{
        flexDirection:'row',
    }
});

export default Maze;
