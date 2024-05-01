const API_TOKEN = "f73982261ee9d3c0189df360f5aeb20c";
export function getFilmsFromApiWithSearchedText(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// API/TMDBApi.js

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}

export async function fetchNowPlayingMovies() {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
      API_TOKEN +
      "&language=en-US&page=1";

    const response = await fetch(url);
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
}
