import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinSession, leaveSession } from '../sessionSlice';

function GroupCreationView({ firebaseModel }) {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionIdState] = useState('');

  const user = useSelector((state) => state.user.details);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentSessionId = useSelector((state) => state.session.sessionId);

  const dispatch = useDispatch();

  const createSession = async () => {
    if (!isLoggedIn || currentSessionId) return;
    try {
      setLoading(true);
      const newSessionId = await firebaseModel.createSession([user.userId]);
      dispatch(joinSession({userId: user.userId, sessionId: newSessionId})); // Update the Redux store with the new session ID
      setLoading(false);
      console.log('Current session:', currentSessionId);
    } catch (error) {
      setLoading(false);
      console.error('Error creating session:', error);
    }
  };

  const handleJoinSession = async () => {
    if (!isLoggedIn || !sessionId) return;
    try {
      setLoading(true);
      await firebaseModel.joinSession(sessionId, user.userId);
      dispatch(joinSession({userId: user.userId, sessionId: sessionId})); // Update the Redux store when joining a session
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error joining session:', error);
    }
  };

  const handleLeaveSession = async () => {
    if (!isLoggedIn || !currentSessionId) return;
    try {
      setLoading(true);
      await firebaseModel.leaveSession(currentSessionId, user.userId);
      dispatch(leaveSession()); // Update the Redux store when leaving a session
      setLoading(false);
      setSessionIdState(''); // Reset local state
    } catch (error) {
      setLoading(false);
      console.error('Error leaving session:', error);
    }
  };

  // UI rendering logic
  if (!isLoggedIn) {
    return <div>Please log in to create or join a session.</div>;
  }

  if (currentSessionId) {
    return (
      <div>
        <h1>Movie Session</h1>
        <p>You are currently in a session: {currentSessionId}</p>
        <button onClick={handleLeaveSession} disabled={loading}>
          {loading ? 'Leaving...' : 'Leave Session'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Movie Session</h1>
      <div>
        <button onClick={createSession} disabled={loading}>
          {loading ? 'Creating...' : 'Create New Session'}
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionIdState(e.target.value)}
        />
        <button onClick={handleJoinSession} disabled={loading || !sessionId}>
          {loading ? 'Joining...' : 'Join Session'}
        </button>
      </div>
    </div>
  );
}

export default GroupCreationView;
