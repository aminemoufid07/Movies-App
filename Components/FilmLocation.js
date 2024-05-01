// FilmLocation.js

import React from "react";
import { StyleSheet, View, Text } from "react-native";

const FilmLocation = () => {
  return (
    <View style={styles.container}>
      <Text>Film Location Page</Text>
      {/* Add content to display film location information */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FilmLocation;
