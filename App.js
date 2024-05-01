import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./Components/Search";
import FilmDetail from "./Components/FilmDetail";
import FilmLocation from "./Components/FilmLocation";
import NowPlayingMovies from "./Components/NowPlayingMovies";
import MovieDetailsPage from "./Components/MovieDetailsPage";
import AgedetectionAI from "./Components/AgedetectionAI";
const Stack = createStackNavigator();
// App.js

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: "Recherche de films" }}
        />
        <Stack.Screen name="AgedetectionAI" component={AgedetectionAI} />

        {/* <Stack.Navigator initialRouteName="Search"> */}

        <Stack.Screen
          name="NowPlayingMovies"
          component={NowPlayingMovies}
          options={{ title: "Films actuellement en salle" }}
        />
        <Stack.Screen name="MovieDetailsPage" component={MovieDetailsPage} />
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{ title: "Détails du film" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
