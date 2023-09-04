import React, { useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import Maze from "./components/Maze";
import Header from "./components/Header";
import { levels } from "./util/levels";
import Menu from "./components/Menu";

export default function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [level, setLevel] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(levels[level].startPos);

  function handleToogleMenu(action) {
    if (action === "reset") handleResetGame();
    setShowMenu((prev) => !prev);
  }

  function handleResetGame() {
    setLevel(0);
  }

  function handleLevelChange(newLevel) {
    if (newLevel <= levels.length - 1) setLevel(newLevel);
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
