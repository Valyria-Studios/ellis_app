import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Search Bar</Text>
      </View>
      <View>
        <Text>Scroller</Text>
      </View>
      <View>
        <Text>Sort by</Text>
      </View>
      <View>
        <Text>Cards</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
