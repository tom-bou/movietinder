import { BASE_URL, API_KEY, ACCESS_TOKEN } from "../TMDBApiConfig.js";

export function getMovieDetails(movieId) {
  function myFetchACB(response) {
    if (!response.ok) throw new Error("fetch failed");
    return response.json();
  }

  function checkAdult(movieDetails) {
    if (movieDetails.adult) {
      throw new Error("Adult content found, fetching another movie");
    }
    return movieDetails;
  }

  function changeVideoACB(movieDetails) {
    function videoToKeyChangeACB(videoResponse) {
      if (videoResponse.results && videoResponse.results.length > 0) {
        movieDetails.video = videoResponse.results[0].key;
      } else {
        movieDetails.video = null; 
      }
      return movieDetails;
    }
    return getMovieVideo(movieId).then(videoToKeyChangeACB);
  }

  function changeCreditsACB(movieDetails) {
    function creditsToCastChangeACB(creditsResponse) {
      movieDetails.cast = creditsResponse.cast;
      movieDetails.director = creditsResponse.crew.find((crewMember) => crewMember.job === "Director");
      console.log(movieDetails.director)
      return movieDetails;
    }
    return getMovieCredits(movieId).then(creditsToCastChangeACB);
  }

  function onErrorACB(error) {
    console.log("error is", error);
    throw error;
  }

  const url = BASE_URL + "movie/" + movieId + "?language=en-US&api_key=" + API_KEY;

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  })
    .then(myFetchACB)
    .then(checkAdult)
    .then(changeVideoACB)
    .then(changeCreditsACB)
    .catch(onErrorACB);
}

function getMovieVideo(movieId) {
  function myFetchACB(response) {
    if (!response.ok) throw new Error("fetch failed");
    return response.json();
  }

  function onErrorACB(error) {
    console.log("error is", error);
    throw error;
  }

  const url = BASE_URL + "movie/" + movieId + "/videos?language=en-US";

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  })
    .then(myFetchACB)
    .catch(onErrorACB);
}

function getMovieCredits(movieId) {
  function myFetchACB(response) {
    if (!response.ok) throw new Error("fetch failed");
    return response.json();
  }

  function onErrorACB(error) {
    console.log("error is", error);
    throw error;
  }

  const url = BASE_URL + "movie/" + movieId + "/credits?language=en-US";

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  })
    .then(myFetchACB)
    .catch(onErrorACB);
}
