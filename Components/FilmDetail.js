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
  console.log(film.id);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${film.id}?language=en-US&api_key=f73982261ee9d3c0189df360f5aeb20c`
        );
        const data = await response.json();
        console.log("Film details:", data);
        // Traitement des détails du film ici
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [film.id]);

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
        <View style={{ alignItems: "center" }}>
          <Text style={styles.detailLabel}> {film.title}</Text>
          <View style={{ height: 30 }} />

          <Image
            style={{ width: 200, height: 300 }}
            source={{
              uri: film.poster_path
                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                : "https://via.placeholder.com/200x300",
            }}
          />
          <View style={{ height: 30 }} />

          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Release Date:</Text>
            <Text style={styles.detailText}>{film.release_date || "N/A"}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Popularity:</Text>
            <Text style={styles.detailText}>{film.popularity || "N/A"}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Vote Average:</Text>
            <Text style={styles.detailText}>{film.vote_average || "N/A"}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Vote Count:</Text>
            <Text style={styles.detailText}>{film.vote_count || "N/A"}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Adult:</Text>
            <Text>
              {film.adult !== undefined ? (film.adult ? "Yes" : "No") : "N/A"}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Original Language:</Text>
            <Text style={styles.detailText}>
              {film.original_language || "N/A"}
            </Text>
          </View>
          <View style={{ height: 30 }} />
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
          <View style={{ height: 30 }} />
          <Text style={styles.detailLabel}>Overview:</Text>
          <Text style={styles.detailText}> {film.overview}</Text>
          {/* <Button
        title={playing ? "Pause" : "Lire la vidéo"}
        onPress={togglePlaying}
      /> */}
        </View>
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
  detailContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default FilmDetail;
