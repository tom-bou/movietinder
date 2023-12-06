import { likeMovie, unlikeMovie } from '../actions/userActions';

export default class UserModel {
    constructor(email, firebaseInstance, userId, dispatch) {
        this.email = email;
        this.liked_movies = [];
        this.firebase = firebaseInstance;
        this.userId = userId;
        this.dispatch = dispatch;
    }

    // Method to add a movie to liked_movies
    async likeMovie(movieId) {
        if (!this.liked_movies.includes(movieId)) {
            this.liked_movies.push(movieId);
            await this.firebase.saveLikedMovie(this.userId, movieId);
            this.dispatch(likeMovie(movieId)); 
        }
    }

    // Method to add a movie to liked_movies

    // Method to remove a movie from liked_movies
    async unlikeMovie(movieId) {
        const index = this.liked_movies.indexOf(movieId);
        if (index > -1) {
            this.liked_movies.splice(index, 1);
            await this.firebase.removeLikedMovie(this.userId, movieId);
            this.dispatch(unlikeMovie(movieId));
        }
    }

    // Method to get the list of liked movies
    getLikedMovies() {
        return this.liked_movies;
    }

}
