import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { getImageFromApi } from "../API/TMDBApi";

const FilmDetail = ({ route }) => {
  const { film } = route.params;
  const [officialTrailerVideo, setOfficialTrailerVideo] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${film.id}/videos?api_key=f73982261ee9d3c0189df360f5aeb20c&language=en-US`
        );
        const data = await response.json();
        const officialTrailer = data.results.find(
          (video) => video.name === "Official Trailer"
        );
        setOfficialTrailerVideo(officialTrailer);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [film.id]);

  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("La vidéo est terminée !");
    }
  };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <ScrollView>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{film.title}</Text>

      <Image
        style={styles.image}
        source={{ uri: getImageFromApi(film.poster_path) }}
      />

      <Text style={styles.text}>Sorti le {film.release_date}</Text>

      <Text style={styles.text}>Note : {film.vote_average}/10</Text>

      <Text style={styles.text}>Synopsis :</Text>
      <Text style={styles.description}>{film.overview}</Text>

      {officialTrailerVideo && (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={officialTrailerVideo.key}
            onChangeState={onStateChange}
          />
        </View>
      )}

      {/* <Button
        title={playing ? "Pause" : "Lire la vidéo"}
        onPress={togglePlaying}
      /> */}
    </ScrollView>
    </ScrollView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontStyle: "italic",
    marginBottom: 10,
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9, // 16:9 aspect ratio
  },
});

export default FilmDetail;
