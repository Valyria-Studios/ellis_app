import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../shared/card";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Text>Search Bar</Text>
        <Text> Icon </Text>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Text style={styles.scrollerItems}>Scroller</Text>
          <Text style={styles.scrollerItems}>Scroller</Text>
          <Text style={styles.scrollerItems}>Scroller</Text>
          <Text style={styles.scrollerItems}>Scroller</Text>
          <Text style={styles.scrollerItems}>Scroller</Text>
          <Text style={styles.scrollerItems}>Scroller</Text>
          <Text style={styles.scrollerItems}>Scroller</Text>
        </ScrollView>
      </View>
      <View style={styles.sortByContainer}>
        <Text style={styles.sortBy}>Sort by</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Text style={styles.sortByItems}>hello</Text>
          <Text style={styles.sortByItems}>hello</Text>
          <Text style={styles.sortByItems}>hello</Text>
          <Text style={styles.sortByItems}>hello</Text>
          <Text style={styles.sortByItems}>hello</Text>
        </ScrollView>
      </View>
      <View>
        <Card>
          <Text>Hello</Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    // alignItems: "center",
    // justifyContent: "center",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  scrollerItems: {
    fontSize: 30,
    paddingRight: 20,
  },
  sortByContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortBy: {
    fontSize: 20,
  },
  sortByItems: {
    fontSize: 20,
    color: "blue",
    padding: 20,
  },
});
