import { BASE_URL, API_KEY, ACCESS_TOKEN } from "./TMDBApiConfig.js";
import { resolvePromise } from "./resolvePromise.js";

function getMovieDetails(movieId) {
  function myFetchACB(response) {
    if (!response.ok) throw new Error("fetch failed");
    return response.json();
  }

  function onErrorACB(error) {
    console.log("error is", error);
    throw error;
  }

  const url = BASE_URL + "movie/" + movieId + "?language=en-US";

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

function randomMovie() {
  let promiseStateDetails = {};
  let promiseStateVideo = {};
  let movieId = Math.floor(Math.random() * 10000);

  resolvePromise(getMovieDetails(movieId), promiseStateDetails);
  resolvePromise(getMovieVideo(movieId), promiseStateVideo);

  
  console.log(promiseStateDetails, promiseStateVideo);

}

// randomMovie();

// resolvePromise(getMovieDetails(341), promiseState);
// console.log("promiseState", promiseState);

// resolvePromise(getMovieVideo(341), promiseState2);
// console.log("promiseState", promiseState2);




export default { randomMovie };
