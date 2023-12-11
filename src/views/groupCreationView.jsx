import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { joinSession, leaveSession, setSessionMembers } from '../sessionSlice';
import logo from "../images/logo.png";
import fingerswipe from "../images/fingerswipe.png";
import creategroup from "../images/creategroup.png";
import keys from "../images/keys.png";

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
    return <div className="text-center py-4 text-lg text-gray-700" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>Please log in to create or join a session.</div>;
  }
  
  if (currentSessionId) {
    return (
      <div className="flex min-h-screen flex min-h-screen" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
        <h1 className="text-4xl font-thin font-sans"
          style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}>Movie Session</h1>
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
<div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>
  <div className="grid grid-rows-2 grid-cols-1 justify-items-center items-center">
    {/* First row */}
    <div className="p-4 sm:col-span-3 flex justify-center items-center">
      <img className="shadow-inner animate-jump-in animate-delay-[400ms]" style={{ filter: 'drop-shadow(0 0 0.4rem #C772ED)' }} src={logo} alt="Logo icon" />
    </div>

    {/* Second row */}
    <div className="flex flex-col sm:flex-row justify-center items-start w-full">
      <div className="p-4 w-full sm:w-1/3 sm:w-auto sm:flex-1 flex justify-center items-center flex-col animate-jump-in animate-delay-[900ms]">
        <button
          onClick={createSession}
          disabled={loading}
          className="text-4xl font-thin font-sans"
          style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}
        >
          {loading ? 'Creating...' : 'CREATE NEW SESSION'}
        </button>
        <img className="mt-8 w-96 hover:animate-jump" src={creategroup} alt="Create Group" />
      </div>
      <div className="p-4 w-full sm:w-1/3 sm:w-auto sm:flex-1 flex flex-col justify-center items-center animate-jump-in animate-delay-[900ms]">
        <h1 className="text-4xl font-thin font-sans" style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}>START SWIPING</h1>
        <img className="w-32 hover:animate-wiggle-more mt-6" src={fingerswipe} alt="Swipe Finger" />
      </div>
      <div className="p-4 w-full sm:w-auto sm:flex-1 flex justify-center items-center flex-col animate-jump-in animate-delay-[900ms]">
        <button
          onClick={handleJoinSession}
          disabled={loading || !sessionId}
          className="text-4xl font-thin font-sans "
          style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}
        >
          {loading ? 'Joining...' : 'JOIN A SESSION'}
        </button>
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionIdState(e.target.value)}
          className="mt-6 flex shadow-inner border rounded py-2 px-10 text-gray-700 leading-normal focus:outline-none focus:shadow-outline "
          style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}
        />
        <img className="w-32 hover:animate-shake mt-6" src={keys} alt="Keys" />
      </div>
    </div>
  </div>
</div>
);
}

export default GroupCreationView;