import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Menu({ level, toogleMenu }) {
  const [sound, setSound] = useState(null);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require("../assets/menu_main_theme.mp3"));
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    if (!sound) playSound();

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MAZE{"\n"}PUZZLE</Text>
      <View style={styles.buttonsView}>
        <TouchableOpacity onPress={() => toogleMenu("reset")}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>NOVO JOGO</Text>
          </View>
        </TouchableOpacity>
        {level > 0 ? (
          <TouchableOpacity onPress={() => toogleMenu()}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>RETOMAR</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 60,
  },
  title: {
    color: "black",
    fontSize: 70,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsView: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  buttonContainer: {
    backgroundColor: "#ffcbcb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
