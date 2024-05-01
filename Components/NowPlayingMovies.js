import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getImageFromApi } from "../API/TMDBApi";

const NowPlayingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
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

 

  const handleMoviePress = async (movieTitle) => {
    try {
      const searchQuery = `${movieTitle} location of theater movie in usa la`;
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

      console.log("Addresses for", movieTitle, ":", addresses);

      // Naviguer vers MovieDetailsPage avec le titre du film et les informations des cinémas en paramètres
      navigation.navigate("MovieDetailsPage", {
        movie: { movietitle: movieTitle, theaters: addresses },
      });
    } catch (error) {
      console.error("Error fetching movie theaters:", error);
    }
  };

  const renderMovieItem = ({ item }) => (
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
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Search"
          onPress={() => navigation.navigate("SearchPage")} // Naviguer vers la page de recherche
        />
      </View> */}
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
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
});

export default NowPlayingMoviesPage;
