import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

const MovieDetailsPage = ({ route }) => {
  const { movie } = route.params;
  const { movietitle, theaters } = movie;

  const handleTheaterPress = (theater) => {
    const { title, address } = theater;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${title}+${address}`;
    Linking.openURL(googleMapsUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{movietitle}</Text>
      {theaters && theaters.length > 0 ? (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Cinema</Text>
          </View>
          {theaters.map((theater, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleTheaterPress(theater)}
            >
              <View style={styles.row}>
                <Text style={styles.theaterText}>{theater.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.noTheatersText}>No theaters available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 5,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  theaterText: {
    fontSize: 16,
  },
  noTheatersText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
  },
});

export default MovieDetailsPage;
