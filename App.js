import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import Maze from './components/Maze';

export default function App() {
  return (
      <View style={styles.container}>
        <Maze />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
