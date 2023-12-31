import { resolvePromise } from "./resolvePromise.js";
import { getMovieDetails, getMovieVideo } from "./movieSource.js";



const movieModel = {
  currentMoviePromiseState: {},

  
  doMovieSearch(searchParams) {
    var self = this; 

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function tryGetMovieDetails() {
      let movieDetailsPromise = getMovieDetails(searchParams);
      resolvePromise(movieDetailsPromise, self.currentMoviePromiseState);
      movieDetailsPromise.catch(function (error) {
        console.error("Failed to get movie details, retrying...", error);
        searchParams = getRandomInt(1000);
        tryGetMovieDetails(); // Recursive call for retry
      });
      // check if the movie has a trailer and poster image if not try again
    }

    tryGetMovieDetails();
    return {...this.currentMoviePromiseState};
  },


  likeMovie(movie) {
    console.log(movie);
    this.doMovieSearch(Math.floor(Math.random() * Math.floor(869835)));
  },

  dislikeMovie(movie) {
    console.log(movie);
    this.doMovieSearch(Math.floor(Math.random() * Math.floor(869835)));
  }
  // Funktion för gilla knappen. Filmen vi är inne på ska sparas för användaren och läggas i likedmovies
};

export default movieModel;
//Knappar - Corre
//Visa informationen för varje film
//Visa bibilioteket med gillade filmer
//Log in funktionen - David
//Ladda in hemsidan funktionen (loading symbol) - Corre