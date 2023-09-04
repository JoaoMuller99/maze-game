import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header({ level, toogleMenu, resetLevel }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toogleMenu}>
        <Text style={styles.text}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Fase: {level + 1}</Text>
      <TouchableOpacity onPress={resetLevel}>
        <MaterialCommunityIcons name="reload" size={30} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    minHeight: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  icon: {
    transform: [{ rotate: "-90deg" }],
  },
});
