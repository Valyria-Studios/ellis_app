import { StyleSheet, Text, View } from "react-native";

export default function Applications() {
  return (
    <View style={styles.container}>
      <Text>Applications Page</Text>
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
