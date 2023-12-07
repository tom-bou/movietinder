import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinSession, leaveSession, setSessionMembers } from '../sessionSlice';

function GroupCreationView({ firebaseModel }) {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionIdState] = useState('');

  const user = useSelector((state) => state.user.details);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentSessionId = useSelector((state) => state.session.sessionId);
  const sessionMembers = useSelector((state) => state.session.members);
  const sessionMemberEmails = useSelector((state) => state.session.emails);

  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe = () => {};

    if (currentSessionId) {
        unsubscribe = firebaseModel.onSessionChanged(currentSessionId, (sessionData) => {
          // Assuming sessionData.members contains user IDs
          fetchSessionMemberEmails(sessionData.members);
        });
      }
    

    return () => unsubscribe(); // Cleanup the listener when the component unmounts or sessionId changes
  }, [firebaseModel, currentSessionId]);


  const createSession = async () => {
    if (!isLoggedIn || currentSessionId) return;
    try {
      setLoading(true);
      const newSessionId = await firebaseModel.createSession([user.userId]);
      dispatch(joinSession({userId: user.userId, sessionId: newSessionId})); // Update the Redux store with the new session ID
      setLoading(false);
      fetchSessionMembers(newSessionId, [user.userId], dispatch, firebaseModel);

    } catch (error) {
      setLoading(false);
      console.error('Error creating session:', error);
    }
  };

  const fetchSessionMemberEmails = async (memberIds) => {
    try {
      const memberEmails = await Promise.all(
        memberIds.map((userId) => firebaseModel.getUserDetails(userId).then((user) => user.email))
      );
      dispatch(setSessionMembers({memberIds: memberIds, emails: memberEmails.filter(email => email != null)}));
    } catch (error) {
      console.error('Error fetching member emails:', error);
    }
  };


  async function fetchSessionMembers(sessionId, userIds, dispatch, firebaseModel) {
    try {
      const members = await firebaseModel.getSessionMembers(sessionId);
      console.log(members)
      dispatch(setSessionMembers({emails: members, memberIds: userIds})); // Assuming members is an array of member details
    } catch (error) {
      console.error('Error fetching session members:', error);
    }
  }
  

  const handleJoinSession = async () => {
    if (!isLoggedIn || !sessionId) return;
    try {
      setLoading(true);
      await firebaseModel.joinSession(sessionId, user.userId);
      dispatch(joinSession({userId: user.userId, sessionId: sessionId})); // Update the Redux store when joining a session
      setLoading(false);
      await fetchSessionMembers(sessionId, [user.userId], dispatch, firebaseModel);
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
    return <div className="text-center py-4 text-lg text-gray-700">Please log in to create or join a session.</div>;
  }
  
  if (currentSessionId) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Movie Session</h1>
        <p className="text-gray-600 mb-4">You are currently in a session: <span className="font-semibold">{currentSessionId}</span></p>

        {sessionMemberEmails && (
        <div>
            <h2 className="text-lg font-semibold text-gray-800">Session Members:</h2>
            <ul className="list-disc list-inside">
            {sessionMemberEmails.map((member, index) => (
                <li key={index}>{member}</li>
            ))}
            </ul>
        </div>
)}

        <button 
          onClick={handleLeaveSession} 
          disabled={loading}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-300 mt-4"
        >
          {loading ? 'Leaving...' : 'Leave Session'}
        </button>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">Movie Session</h1>
      <div className="mb-4">
        <button 
          onClick={createSession} 
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
        >
          {loading ? 'Creating...' : 'Create New Session'}
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionIdState(e.target.value)}
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button 
          onClick={handleJoinSession} 
          disabled={loading || !sessionId}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded disabled:bg-green-300"
        >
          {loading ? 'Joining...' : 'Join Session'}
        </button>
      </div>
    </div>
  );
  }  

export default GroupCreationView;
