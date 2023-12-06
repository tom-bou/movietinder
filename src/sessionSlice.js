// sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionId: null,
    members: [],
    likedMovies: [],
  },
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
    },
    joinSession: (state, action) => {
      const userId = action.payload;
      if (!state.members.includes(userId)) {
        state.members.push(userId);
      }
    },
    likeMovie: (state, action) => {
      const movieId = action.payload;
      if (!state.likedMovies.includes(movieId)) {
        state.likedMovies.push(movieId);
      }
    },

  },
});

export const { setSessionId, joinSession, likeMovie, unlikeMovie } = sessionSlice.actions;

export default sessionSlice.reducer;
