import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function GroupCreationView({ firebaseModel }) {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const user = useSelector((state) => state.user.details);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const createSession = async () => {
    if (!user) return; // Check if user is logged in
    try {
      setLoading(true);
      const newSessionId = await firebaseModel.createSession([user.uid]);
      setLoading(false);
      console.log('New Session ID:', newSessionId);
    } catch (error) {
      setLoading(false);
      console.error('Error creating session:', error);
    }
  };

  const joinSession = async () => {
    if (!user || !sessionId) return; // Check if user is logged in and sessionId is provided
    try {
      setLoading(true);
      await firebaseModel.joinSession(sessionId, user.uid);
      setLoading(false);
      console.log('Joined Session ID:', sessionId);
    } catch (error) {
      setLoading(false);
      console.error('Error joining session:', error);
    }
  };

  // If the user is not logged in, display a message or redirect
  if (!isLoggedIn) {
    return <div>Please log in to create or join a session.</div>;
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
          onChange={(e) => setSessionId(e.target.value)}
        />
        <button onClick={joinSession} disabled={loading || !sessionId}>
          {loading ? 'Joining...' : 'Join Session'}
        </button>
      </div>
    </div>
  );
}

export default GroupCreationView;
