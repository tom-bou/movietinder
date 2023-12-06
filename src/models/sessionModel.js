import { joinSession, likeMovie } from "../sessionSlice";

export default class SessionModel {
    constructor(sessionId, firebaseInstance, dispatch) {
        this.sessionId = sessionId;
        this.firebase = firebaseInstance;
        this.dispatch = dispatch;
        this.members = []; // Array of user IDs
        this.likedMovies = []; // Array of liked movie IDs for the session
    }

    // Method to join a session
    async joinSession(userId) {
        // Logic to join a session
        await this.firebase.joinSession(this.sessionId, userId);
        if (!this.members.includes(userId)) {
            this.members.push(userId);
        }
        this.dispatch(joinSession(userId));
        // Dispatch any relevant Redux actions if needed
    }

    // Method to like a movie in a session
    async likeMovieInSession(userId, movieId) {
        // Logic to like a movie in a session
        await this.firebase.likeMovieInSession(this.sessionId, userId, movieId);
        if (!this.likedMovies.includes(movieId)) {
            this.likedMovies.push(movieId);
        }
        this.dispatch(likeMovie(movieId));
        // Dispatch any relevant Redux actions if needed
    }

    // Other session-related methods...
}
