// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    details: {
      email: '',
      userId: '',
      likedMovies: [],
    },
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.details.email = action.payload.email;
      state.details.userId = action.payload.userId;
      state.details.likedMovies = action.payload.likedMovies;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.details = { email: '', userId: '', likedMovies: [] };
    },
    likeMovie: (state, action) => {
      if (!state.details.likedMovies.includes(action.payload)) {
        state.details.likedMovies.push(action.payload);
      }
    },
    unlikeMovie: (state, action) => {
      state.details.likedMovies = state.details.likedMovies.filter(
        (movieId) => movieId !== action.payload
      );
    },
  },
});

export const { loginUser, logoutUser, likeMovie, unlikeMovie } = userSlice.actions;

export default userSlice.reducer;
