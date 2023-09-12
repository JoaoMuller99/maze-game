import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import Header from "./components/Header";
import Maze from "./components/Maze";
import Menu from "./components/Menu";
import { levels } from "./util/levels";

export default function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [level, setLevel] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(levels[level].startPos);
  const [sound, setSound] = useState(null);

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(require("./assets/level_change.wav"));
    setSound(sound);
  }

  async function playSound() {
    if (sound) await sound.replayAsync();
  }

  useEffect(() => {
    loadSound();
  }, []);

  function handleToogleMenu(action) {
    if (action === "reset") handleResetGame();
    setShowMenu((prev) => !prev);
  }

  function handleResetGame() {
    setLevel(0);
  }

  async function handleLevelChange(newLevel) {
    if (newLevel <= levels.length - 1) {
      playSound();
      setLevel(newLevel);
    }
  }

  function handleResetLevel() {
    setPlayerPosition(levels[level].startPos);
  }

  return (
    <>
      {showMenu ? (
        <Menu level={level} toogleMenu={handleToogleMenu} />
      ) : (
        <View style={styles.container}>
          <Header level={level} toogleMenu={handleToogleMenu} resetLevel={handleResetLevel} />
          <Maze
            playerPosition={playerPosition}
            setPlayerPosition={setPlayerPosition}
            level={level}
            changeLevel={handleLevelChange}
            toogleMenu={handleToogleMenu}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
