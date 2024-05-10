import React, { useEffect, useState, createRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { useNavigation } from "@react-navigation/native";
import { getImageFromApi } from "../API/TMDBApi";
import Modal from "react-native-modal";
//import { Dropdown } from "react-native-element-dropdown"; // Assurez-vous d'avoir installé cette dépendance
import { Picker } from "@react-native-community/picker";

const NowPlayingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovieTitle, setSelectedMovieTitle] = useState("");
  const navigation = useNavigation();
  const pickerRef = createRef(null);

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
    setSelectedMovieTitle(movieTitle);
    setModalVisible(true);
  };

  const handleSearch = async () => {
    try {
      const { movieTitle } = modalVisible;

      const searchQuery = ` adresses cinema disponibles sur ${selectedCity}`;
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

      // Récupérer les places à partir du résultat JSON
      const places = result.places;
      console.log("Places:", places);

      // Récupération automatique des titres et adresses des places

      // Check if places is defined before accessing its properties
      if (places && places.length > 0) {
        // If places is defined and not empty
        placeData = places.map((place) => ({
          title: place.title,
          address: place.address,
        }));
      } else if (result.knowledgeGraph) {
        // If places is undefined and knowledgeGraph is defined
        placeData = [
          {
            title: result.knowledgeGraph.title || "Unknown",
            address: result.knowledgeGraph.attributes.Address || "Unknown",
          },
        ];
      } else {
        // If both places and knowledgeGraph are undefined
        placeData = [];
      }

      console.log("Place data:", placeData);

      // Naviguer vers MovieDetailsPage avec le titre du film et les informations des cinémas en paramètres
      navigation.navigate("MovieDetailsPage", {
        movie: { movietitle: movieTitle, theaters: placeData },
      });

      setModalVisible(false);
    } catch (error) {
      console.error("Error fetching movie theaters:", error);
    }
  };
  // const handleNearbyTheaterSearch = async () => {
  //   try {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         console.log(position);
  //         searchNearbyTheaters(
  //           position.coords.latitude,
  //           position.coords.longitude
  //         );
  //       },
  //       (error) => {
  //         console.error("Error handling location permission:", error);
  //       },
  //       { enableHighAccuracy: true, timeout: 60000 }
  //     );
  //   } catch (error) {
  //     console.error("Error handling location permission:", error);
  //   }
  // };

  // const searchNearbyTheaters = async (latitude, longitude) => {
  //   try {
  //     console.log("Latitude:", latitude);
  //     console.log("Longitude:", longitude);

  //     const apiKey = "AIzaSyBMxEhoXsi6NADSY-yNlubcUg8I1S2wLDg";
  //     const radius = 125000; // Rayon de recherche en mètres (5 km dans cet exemple)
  //     const type = "movie_theater"; // Type de lieu recherché (cinéma dans cet exemple)

  //     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log("Data:", data);

  //     if (data.results && data.results.length > 0) {
  //       const nearestTheater = data.results[0];

  //       // Extraire l'adresse du cinéma le plus proche
  //       const theaterAddress = nearestTheater.vicinity;

  //       // Construire l'URL Google Maps avec l'adresse du cinéma
  //       const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  //         theaterAddress
  //       )}`;

  //       // Rediriger l'utilisateur vers Google Maps
  //       window.open(mapsUrl, "_blank");
  //     } else {
  //       console.log("Aucun cinéma trouvé à proximité.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching nearby theaters:", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select a country:</Text>
            <Picker
              ref={pickerRef}
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
            {/* <Button
              title="Search Nearby Theaters"
              onPress={handleNearbyTheaterSearch}
            /> */}
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
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "#999",
    marginBottom: 10,
  },
});

export default NowPlayingMoviesPage;
