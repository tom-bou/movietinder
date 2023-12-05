import { observer } from 'mobx-react-lite';
import { useState } from "react";
import LikedMoviesView from '../views/likesView';

export default
observer( 
    function LikesPresenter(props) {
    
    return (
        <div>
            <LikedMoviesView/>
        </div>
        );


});


/*
function addMovieToLiked(movie) {
  addLikedMovie(movie);
  updateView();
}

function removeMovieFromLiked(movieId) {
  removeLikedMovie(movieId);
  updateView();
}

function updateView() {
  const likedMovies = getAllLikedMovies();
  // Perform view rendering using 'likedMovies' data
  // For example, call a function to update the UI with the new data
}

*/
