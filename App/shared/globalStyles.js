import { StyleSheet } from "react-native";

const globalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8f9",
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },

  searchIcon: {
    paddingHorizontal: 10,
  },

  searchSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 50,
    padding: 5,
    alignItems: "center",
    flex: 1,
    height: 50,
    backgroundColor: "white",
  },

  searchBar: {
    flex: 1,
    fontSize: 18,
    color: "#999fa0",
  },

  gridIcon: {
    paddingLeft: 20,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // in case there are many types and they need to wrap to the next line
    marginTop: 10,
  },

  tagBackground: {
    borderWidth: 1,
    borderColor: "#c9cbcd",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5, // spacing between types
    marginBottom: 5,
  },

  individualTags: {
    color: "#114e57",
    fontSize: 12,
  },
});

export default globalstyles;
