import { BASE_URL, API_KEY, ACCESS_TOKEN } from "../TMDBApiConfig.js";

export function getMovieDetails(movieId) {
  function myFetchACB(response) {
    if (!response.ok) {
      response.text().then(text => console.error(`Fetch failed: ${text}`));
      throw new Error(`Fetch failed with status ${response.status}`);
    }
    return response.json();
  }

  function checkAdult(movieDetails) {
    if (movieDetails.adult) {
      throw new Error("Adult content found, fetching another movie");
    }
    return movieDetails;
  }

  function checkPicture(movieDetails) {
    if (!movieDetails.poster_path) {
      throw new Error("No picture available for this movie");
    }
    return movieDetails;
  }

  function changeVideoACB(movieDetails) {
    function videoToKeyChangeACB(videoResponse) {
      if (videoResponse.results && videoResponse.results.length > 0) {
        movieDetails.video = videoResponse.results[0].key;
      } else {
        throw new Error("No video available for this movie");
      }
      return movieDetails;
    }
    return getMovieVideo(movieId).then(videoToKeyChangeACB);
  }

  function changeCreditsACB(movieDetails) {
    function creditsToCastChangeACB(creditsResponse) {
      if (!creditsResponse.cast || creditsResponse.cast.length === 0) {
        throw new Error("No cast information available");
      }
      movieDetails.cast = creditsResponse.cast;
  
      const director = creditsResponse.crew.find(crewMember => crewMember.job.toLowerCase().includes("director"));
      if (!director) {
        throw new Error("Director not found");
      }
      movieDetails.director = director;
  
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
    .then(checkPicture) 
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