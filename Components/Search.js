import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation(); // Obtenir l'objet de navigation

  const handleNowPlayingPress = () => {
    // setShowSearchButton(false);
    navigation.navigate("NowPlayingMovies"); // Naviguer vers la page des films en cours
  };

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadFilms = () => {
    if (searchedText.length > 0) {
      setIsLoading(true);
      getFilmsFromApiWithSearchedText(searchedText, page + 1).then((data) => {
        setPage(data.page);
        setTotalPages(data.total_pages);
        setFilms([...films, ...data.results]);
        setIsLoading(false);
      });
    }
  };

  const searchTextInputChanged = (text) => {
    setSearchedText(text);
  };

  const searchFilms = () => {
    console.log("Search films function called."); // Ajoutez ce console.log pour vérifier l'appel de la fonction
    setPage(0);
    setTotalPages(0);
    setFilms([]); // Réinitialiser les films à un tableau vide
    loadFilms();
  };

  const displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* {showSearchButton && ( // Afficher le bouton de recherche uniquement si showSearchButton est true */}
      <View style={styles.header}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={searchTextInputChanged}
          onSubmitEditing={searchFilms} // Assurez-vous que cette ligne est correctement définie
        />

        <Button title="Rechercher" onPress={searchFilms} />
      </View>
      {/* )} */}
      <FlatList
        style={styles.flatList}
        data={films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FilmItem film={item} navigation={navigation} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (page < totalPages) {
            loadFilms();
          }
        }}
      />
      {displayLoading()}
      <View style={styles.footer}>
        <Button title="Now Playing Movies" onPress={handleNowPlayingPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textinput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    paddingHorizontal: 10,
  },
  flatList: {
    flex: 1,
    padding: 10,
  },
  footer: {
    padding: 10,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;
