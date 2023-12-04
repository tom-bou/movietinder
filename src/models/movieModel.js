

import { resolvePromise } from "./resolvePromise.js";
import { getMovieDetails, getMovieVideo } from "./movieSource.js";
import { get } from "mobx";

export default {
  title: "",
  picture: "",
  trailer: "",
  summary: "",
  genre: "",
  releaseyear: "",
  currentMoviePromiseState: {},

  doRandomMovieSearch(searchParams) {
    var self = this; 

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function tryGetMovieDetails() {
      let searchParams = getRandomInt(1000);
      let movieDetailsPromise = getMovieDetails(searchParams);

      resolvePromise(movieDetailsPromise, self.currentMoviePromiseState);

      movieDetailsPromise.catch(function (error) {
        console.error("Failed to get movie details, retrying...", error);
        tryGetMovieDetails(); // Recursive call for retry
      });
    }

    tryGetMovieDetails();
  },

    //Funktion för gilla knappen. Filmen vi är inne på ska sparas för användaren och läggas i likedmovies

    //

}



//Knappar - Corre
//Visa informationen för varje film
//Visa bibilioteket med gillade filmer
//Log in funktionen - David
//Ladda in hemsidan funktionen (loading symbol) - Corre
