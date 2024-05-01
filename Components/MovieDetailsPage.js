import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

const MovieDetailsPage = ({ route }) => {
  const { movie } = route.params;
  const { movietitle, theaters } = movie;
  const [processedTheaters, setProcessedTheaters] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const processedTheatersData = await Promise.all(
        theaters.map(async (address) => {
          try {
            const response = await fetchAddressData(address);
            const data = await response.json();
            return processAddressData(data);
          } catch (error) {
            console.error("Error fetching data for address:", error);
            return null;
          }
        })
      );
      setProcessedTheaters(
        processedTheatersData.filter((data) => data !== null)
      );
    };

    fetchData();
  }, [theaters]);

  const fetchAddressData = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyBMxEhoXsi6NADSY-yNlubcUg8I1S2wLDg`
    );
    return response;
  };

  const processAddressData = (data) => {
    if (data && data.status === "OK") {
      const address = data.results[0].formatted_address;
      const location = data.results[0].geometry.location;
      return { address, location };
    } else {
      return null;
    }
  };

  const handleClickAddress = (location) => {
    const formattedLocation = `${location.lat},${location.lng}`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;
    Linking.openURL(mapUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movietitle}</Text>
      <View style={styles.addressContainer}>
        {processedTheaters && processedTheaters.length > 0 ? (
          <>
            <Text style={styles.addressTitle}>Adresses disponibles :</Text>
            <FlatList
              data={processedTheaters}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleClickAddress(item.location)}>
                  <Text style={styles.address}>{item.address}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        ) : (
          <Text style={styles.noAddress}>Aucune adresse disponible.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  address: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  noAddress: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
  },
});

export default MovieDetailsPage;
