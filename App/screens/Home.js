import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../shared/Card";
import Amenities from "../shared/Amenities";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Text>Search Bar</Text>
        <Text> Icon </Text>
      </View>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Text style={styles.scrollerItems}>All</Text>
          <Text style={styles.scrollerItems}>Food</Text>
          <Text style={styles.scrollerItems}>Shelter</Text>
          <Text style={styles.scrollerItems}>Hygiene</Text>
          <Text style={styles.scrollerItems}>Health</Text>
          <Text style={styles.scrollerItems}>Work & Learn</Text>
          <Text style={styles.scrollerItems}>Finance</Text>
          <Text style={styles.scrollerItems}>Other</Text>
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortBy}>Sort by</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text style={styles.sortByItems}>Distance</Text>
            <Text style={styles.sortByItems}>Type</Text>
            <Text style={styles.sortByItems}>Availability</Text>
          </ScrollView>
        </View>
        {Amenities.map((amenity) => (
          <Card key={amenity.key}>
            <Text style={styles.cardLocation}>{amenity.location}</Text>
            <Text style={styles.cardDetails}>
              {amenity.times}
              {"\n"}
              {amenity.distance}
              {"\n"}
              {amenity.address}
            </Text>
          </Card>
        ))}
      </ScrollView>
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
    justifyContent: "space-between",
  },
  sortBy: {
    fontSize: 20,
  },
  sortByItems: {
    fontSize: 20,
    color: "blue",
    padding: 20,
  },
  cardLocation: {
    fontSize: 30,
  },
  cardDetails: {
    fontSize: 20,
  },
});
