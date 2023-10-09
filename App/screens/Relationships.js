import { StyleSheet, Text, View } from "react-native";

export default function Relationships() {
  return (
    <View style={styles.container}>
      <Text>Relationships Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
