import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getImageFromApi } from "../API/TMDBApi";
import { Picker } from "@react-native-community/picker";


const NowPlayingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        const url =
          "https://api.themoviedb.org/3/movie/now_playing?api_key=f73982261ee9d3c0189df360f5aeb20c&language=en-US&page=1";

        const response = await fetch(url);
        const json = await response.json();
        setMovies(json.results);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    fetchNowPlayingMovies();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const data = await response.json();
        if (!data.error) {
          setCountries(data.data.map((country) => country.country));
        } else {
          console.error("Erreur lors de la récupération des pays");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des pays:", error);
      }
    };

    fetchCountries();
  }, []);

  const fetchCities = async (country) => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: country,
          }),
        }
      );
      const data = await response.json();
      setCities(data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleMoviePress = async (movieTitle) => {
    setModalVisible({ isVisible: true, movieTitle });
  };

  const handleSearch = async () => {
    try {
      const { movieTitle } = modalVisible;

      const searchQuery = ` location of theater movie in ${selectedCountry} ${selectedCity}`;
      console.log("Search Query:", searchQuery); // Afficher la requête de recherche
      const requestBody = {
        q: searchQuery,
        num: 10,
      };

      const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "760a6dd0909ca3eeee71b72a05fc3c8c4cba2808",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Raw search result:", result);

      // Filtrer uniquement les adresses dans les snippets
      const addresses = result.organic
        .map((item) => {
          const atIndex = item.snippet.indexOf(" at ");
          if (atIndex !== -1) {
            const addressStartIndex = atIndex + 3; // Début de l'adresse après "at"
            const pointIndex = item.snippet.indexOf(".", addressStartIndex);
            if (pointIndex !== -1) {
              return item.snippet.substring(addressStartIndex, pointIndex);
            }
          }
          return null;
        })
        .filter((address) => address !== null);

      console.log(
        "Addresses for",
        selectedCountry,
        selectedCity,
        ":",
        addresses
      );
      console.log("Filtered addresses for", movieTitle, ":", addresses);

      // Naviguer vers MovieDetailsPage avec le titre du film et les informations des cinémas en paramètres
      navigation.navigate("MovieDetailsPage", {
        movie: { movietitle: movieTitle, theaters: addresses },
      });

      setModalVisible(false);
    } catch (error) {
      console.error("Error fetching movie theaters:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible({ isVisible: false });
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select a country:</Text>
            <Picker
              selectedValue={selectedCountry}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedCountry(itemValue);
                setSelectedCity("");
                fetchCities(itemValue);
              }}
            >
              <Picker.Item label="Select a country" value="" />
              {countries.map((country, index) => (
                <Picker.Item key={index} label={country} value={country} />
              ))}
            </Picker>

            <Text style={styles.modalText}>Select a city:</Text>
            <Picker
              selectedValue={selectedCity}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCity(itemValue)
              }
            >
              <Picker.Item label="Select a city" value="" />
              {cities &&
                cities.map((city, index) => (
                  <Picker.Item key={index} label={city} value={city} />
                ))}
            </Picker>

            <Button title="Search" onPress={handleSearch} />
          </View>
        </View>
      </Modal>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoviePress(item.title)}>
            <View style={styles.movieItem}>
              <Image
                style={styles.moviePoster}
                source={{ uri: getImageFromApi(item.poster_path) }}
              />
              <View style={styles.movieInfo}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieReleaseDate}>
                  Released on {item.release_date}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  movieItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  moviePoster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieReleaseDate: {
    fontSize: 14,
    color: "#888",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default NowPlayingMoviesPage;
