import React from 'react';
import { View, StyleSheet } from 'react-native';

const Cell = ({ type, playerPosition,rowIndex,columnIndex }) => {
    let cellStyle = styles.cell;

    if (type === 0) {
        cellStyle = styles.wall;
    } else if (type === 2) {
        cellStyle = styles.goal;
    }

    if (playerPosition.y === rowIndex && playerPosition.x === columnIndex) {
        cellStyle = styles.player;
    }

    return <View style={cellStyle} />;
};

const styles = StyleSheet.create({
    cell: {
        width: 40,
        height: 40,
    },
    wall: {
        width: 40,
        height: 40,
        backgroundColor: 'black',
    },
    goal: {
        width: 40,
        height: 40,
        backgroundColor: 'green',
    },
    player: {
        width: 40,
        height: 40,
        backgroundColor: 'blue',
    },
});

export default Cell;
