// sessionSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    sessionId: null,
    members: [],
    likedMovies: [],
    emails: []
  },
  reducers: {
    resetSession: (state) => {
        state.sessionId = null;
        state.members = [];
        state.likedMovies = [];
        state.emails = [];
    },

    joinSession: (state, action) => {
        state.sessionId = action.payload.sessionId;

      },
    setSessionMembers: (state, action) => {
        state.members = action.payload.members;
        state.emails = action.payload.emails;
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

export const { setSessionId, joinSession, likeMovie, unlikeMovie, leaveSession, setSessionMembers, resetSession } = sessionSlice.actions;

export default sessionSlice.reducer;
