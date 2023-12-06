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

    joinSession: (state, action) => {
      const userId = action.payload.userId;
      state.sessionId = action.payload.sessionId;
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
    leaveSession: (state) => {
      state.sessionId = null;
      state.members = [];
      state.likedMovies = [];
    },

  },
});

export const { setSessionId, joinSession, likeMovie, unlikeMovie, leaveSession } = sessionSlice.actions;

export default sessionSlice.reducer;
