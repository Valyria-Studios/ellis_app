import { StyleSheet } from "react-native";

const globalstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F8F9",
    paddingHorizontal: 15,
  },

  header: {
    color: "#062411",
    fontSize: 30,
    fontFamily: "gabarito-semibold",
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
    backgroundColor: "white",
  },

  searchBar: {
    flex: 1,
    marginVertical: 10,
    fontSize: 18,
    color: "#999fa0",
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: 'wrap'
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

  cardDetails: {
    fontFamily: "gabarito-regular",
    color: "#094852",
    fontSize: 18,
  },

  buttonContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#10798B",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },

  buttonText: {
    fontSize: 16,
    fontFamily: "gabarito-regular",
    color: "#094852",
  },

  textInput: {
    padding: 15,
    marginVertical: 5,
    borderColor: "#C1C5C4",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 25,
  },

  headerContainer: {
    marginBottom: 30,
  },

  subHeader: {
    fontSize: 16,
    fontFamily: "karla-regular",
    letterSpacing: -0.16,
    color: "#030E07",
    marginBottom: 10,
  },

  title: {
    fontSize: 40,
    fontFamily: "gabarito-bold",
    marginTop: 10,
    color: "#094851",
  },

  optionsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#B5BABB",
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionsText: {
    marginLeft: 15,
    fontSize: 18,
    fontFamily: "gabarito-regular",
    color: "#171B1C",
  },

  question: {
    fontSize: 18,
    fontFamily: "gabarito-regular",
    color: "#171B1C",
    marginVertical: 10,
    marginHorizontal: 5,
    // Add more styles for the question
  },

  optionContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    fontFamily: "karla-regular",
    color: "#051A2E",
  },
  placeholder: {
    fontSize: 16,
    color: "#051A2E",
    fontFamily: "karla-regular",
  },

  detailsContainer: {
    flex: 1,
    flexDirection: "row",
  },

  details: {
    color: "#465355",
    margin: 10,
    fontFamily: "gabarito-regular",
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: 2.4,
    textTransform: "uppercase",
  },

  detailsText: {
    fontFamily: "karla-regular",
    fontSize: 16,
    letterSpacing: -0.16,
    fontWeight: 400,
    color: "#171B1C",
    marginBottom: 10,
    marginHorizontal: 10,
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 15,
  },
});

export default globalstyles;
