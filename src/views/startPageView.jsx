import React, { useState, useEffect } from 'react';
import '../style.css'
import { useSelector, useDispatch } from 'react-redux';
import { joinSession, leaveSession, setSessionMembers } from '../sessionSlice';
import biglogo from "../images/biglogo.png";
import logo from "../images/logo.png";
import fingerswipe from "../images/fingerswipe.png";
import creategroup from "../images/creategroup.png";
import keys from "../images/keys.png";
import watchingtv from "../images/watchingtv.gif";
import fourpeople from "../images/fourpeople.gif";
import filmcamera from "../images/filmcamera.gif"
import arrowdown from "../images/arrowdown.png";
import { useNavigate } from "react-router-dom";

function StartPageView({ firebaseModel }) {
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionIdState] = useState('');

  const user = useSelector((state) => state.user.details);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const currentSessionId = useSelector((state) => state.session.sessionId);
  const sessionMembers = useSelector((state) => state.session.members);
  const sessionMemberEmails = useSelector((state) => state.session.emails);

  

  const dispatch = useDispatch();
  let navigate = useNavigate();

  function windowSwipe(evt) {
    navigate("/moviepage");
  }

  function windowLogin(evt) {
    navigate("/login");
  }
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
    return <div className="text-center py-4 text-lg text-white" style={{ background: 'linear-gradient(to bottom, #150629 60%, #1C0A34, #5A2960)' }}>Please log in to create or join a session.</div>;
  }
  
  if (currentSessionId) {
    return (
      <div className="flex min-h-screen text-center flex-col justify-start items-center" style={{ background: 'linear-gradient(to bottom, #080629 40%, #111D3D, #27355D)' }} >
        <div className="mt-10 p-6 rounded-lg shadow-lg bg-white max-w-md animate-fade-down w-full border-4 border-[#4AADAB] bg-[#162534] z-10 shadow-lg"
          style={{ filter: "drop-shadow(0 0 1.5em #4AADAB)" }}>
      
        <h1 className="items-center text-4xl font-thin font-sans" style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}>Movie Session</h1>
        <p className=" text-2xl text-white font-sans font-thin mb-4">You are currently in a session: <br /> <span className="text-xl font-thin  font-sans">{currentSessionId}</span></p>
        
    
        {sessionMemberEmails && (
          <div>
            <h2 className="pt-4 text-4xl font-thin font-sans" style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}>Session Members:</h2>
            <ul className="text-xl list-disc list-inside text-white font-sans font-thin">
              {sessionMemberEmails.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}
        <img class="mt-10" src={filmcamera}/>
        <button><h1 onClick={windowSwipe} className="z-20 text-4xl font-thin font-sans hover:animate-jump animate-duration-1000" style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}>START SWIPING</h1></button>
        </div>
    
        <button 
          onClick={handleLeaveSession} 
          disabled={loading}
          className="z-10 bg-[#3FAF94] hover:bg-[#16846E] text-white font-normal py-2 px-4 rounded hover:bg-[#691D3D] mt-8 animate-fade-up animate-delay-1000"
          
        >
          {loading ? 'Leaving...' : 'Leave Session'}
        </button>
      </div>
      
    );
}


return (
  
  <div className="snap-y snap-mandatory overflow-scroll h-screen w-screen bg-fixed" style={{ background: 'linear-gradient(to bottom, #150629 30%, #1C0A34 40%, #8E4599)' }}>

{/* SCROLL SECTION 1*/}
    <div className=" snap-start h-screen grid grid-rows-2 grid-cols-1 justify-items-center items-center block">
    <nav class=" font-sans rounded-sm z-10 bg-[#150629cb] fixed top-0 flex justify-between w-full py-2 px-8">
  <div class="md:static md:min-h-fit">
    <ul class="flex md:flex-row flex-col items-center md:gap-6">
      <li>
      <button><a class="text-white text-xs md:text-base hover:text-pink-300" onClick={windowSwipe} style={{textShadow: "0px 0px 4px #FFFFFF" }} >Swipe</a></button>
      </li>
      <li>
        <button><a onClick={createSession} class="text-white hover:text-pink-300 text-xs md:text-base" style={{textShadow: "0px 0px 4px #FFFFFF" }}>Create Session</a></button>
      </li>
      <li>
      <button className="flex items-center">
  <h1
    disabled={loading || !sessionId}
    className="text-4xl font-thin font-sans"
    style={{ color: "#000000", textShadow: "0px 0px 4px #FFFFFF" }}
  >
  </h1>
  <input
    type="text"
    placeholder="Enter Session ID"
    value={sessionId}
    onChange={(e) => setSessionIdState(e.target.value)}
    className="flex border rounded md:px-8 text-gray-700 leading-normal focus:outline-none focus:shadow-outline text-xs md:text-base"
  />
  <img
    onClick={handleJoinSession}
    className="w-6 md:w-8 hover:animate-wiggle ml-2"
    src={keys}
    alt="Keys"
  />
</button>
      </li>
    </ul>
  </div>
  <div class="">
    <button onClick={windowLogin} class="bg-[#F4D0FD] px-4 py-1 text-[#2A1547] rounded-lg text-xs md:text-base" style={{textShadow: "0px 0px 2px #812789" }}>
      Login
    </button>
  </div>

  
</nav>
  <img className="pt-44 md:pt-96 w-5/6 md:w-2/3 shadow-inner animate-fade animate-delay-[400ms]" style={{ filter: 'drop-shadow(0 0 0.4rem #C772ED)' }} src={biglogo} alt="Logo icon" />
  <h1 className=" text-xl md:text-3xl flex col font-thin font-sans  md:pt-56 tracking-wide justify-center text-center animate-fade-right animate-delay-[900ms]" style={{ color: "#FFFFFF", textShadow: "0px 0px 3px #FFFFFF" }}>
    Swipe, Like, Save Time On Your Movie Night!
  </h1>
  <img className="animate-bounce animate-duration-[2500ms] w-20 md:pb-12 md:pt-8" style={{ filter: 'drop-shadow(0 0 0.4rem #C772ED)' }} src={arrowdown} alt="Arrow down" />
</div>

{/* SCROLL SECTION 2*/}
    <div className="flex snap-always snap-center items-center" style={{ background: 'linear-gradient(to bottom, #FFE0FF 10%, #FFE0FF)' }}>
    <div className="flex flex-col sm:flex-row justify-center items-start w-full">
    <div className=" w-full sm:w-1/2 sm:w-auto sm:flex-1 flex justify-left items-left flex-col">
    <img class=" justify-center items-center" src={fourpeople} />
    </div>
    <div className=" pt-24 pr-12 p-4 w-full sm:w-1/2 sm:w-auto sm:flex-1 flex justify-center items-center flex-col">
    <h1 className="pt-4 text-4xl flex col font-thin font-sans justify-center text-center" style={{ color: "#2A1547", textShadow: "0px 0px 4px #2A1547" }}>Who are we?</h1>
    <p class=" text-2xl px-10 pt-8 font-thin font-sans justify-center text-center" style={{ color: "#2A1547"}}>Behind this project stands our team consisting of four people; David Tanudin, 
    Cornelia Kärnekull, Tom Boustedt and Linus Bälter, all pursuing the Media Technology program at KTH in our third year. 
    By combining our diverse strengths and aligned goals, we have together created this app - Movie Tinder. <br/> <br/> Enjoy!
     </p>
    </div>
    </div>
    </div>

{/* SCROLL SECTION 3*/}
    <div className="flex snap-always snap-center items-center" style={{ backgroundColor: '#5C2C90' }}>
    <div className="flex flex-col sm:flex-row justify-center items-start w-full">
    <div className="pt-32 p-4 w-full sm:w-1/2 sm:w-auto sm:flex-1 flex justify-center items-center flex-col">
    <h1 className="text-4xl flex col font-thin font-sans justify-center text-center" style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}>What is Movie Tinder?</h1>
    <p class=" text-2xl px-10 pt-8 font-thin font-sans text-white justify-center text-center">Life's too short to spend it searching for movies. 
    Allow us to introduce Movie Tinder – where your next favorite film is just a swipe away! Our app streamlines the process,
     offering the most important info and trailers for a quick informed decision.
     </p>
     <p class=" text-2xl px-10 pt-8 font-thin font-sans text-white justify-center text-center">Simply hit 'Like' on what catches your eye to save it for later. Spend less time deciding and more time enjoying! </p>
    </div>
    <div className=" p-4 w-full sm:w-1/2 sm:w-auto sm:flex-1 flex flex-col justify-center items-center">
    <img class=" justify-center" src={watchingtv} />

    </div>
    </div>
    </div>


  {/* SCROLL SECTION 4*/}
  <div className="z-12 snap-always snap-center bg-gradient-to-r from-indigo-950 via-purple-950 to-indigo-950" >
  <div className="flex flex-col sm:flex-row justify-center items-start w-full">
    {/* CREATE NEW SESSION */}
    <div className="pt-40 p-4 w-full sm:w-1/3 sm:w-auto sm:flex-1 flex justify-center items-center flex-col animate-jump-in animate-delay-[900ms]">
      <h1
        disabled={loading}
        className="text-4xl font-thin font-sans"
        style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}
      >
        {loading ? 'Creating...' : 'CREATE NEW SESSION'}
      </h1>
      <button><img className="mt-8 w-96 hover:animate-jump" src={creategroup} alt="Create Group" onClick={createSession} /></button>
      <p class="text-xl px-10 py-4 font-thin font-sans text-white justify-center text-center">Say goodbye to the endless debate over movie choices! Introducing Group Session - the ultimate solution for smooth movie picks.
        Discover films that match everyone's taste.</p>
    </div>

    {/* START SWIPING*/}
    <div className="pt-40 p-4 w-full sm:w-1/3 sm:w-auto sm:flex-1 flex flex-col justify-center items-center animate-jump-in animate-delay-[900ms]">
      <h1 onClick={windowSwipe} className="text-4xl font-thin font-sans" style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}>START SWIPING</h1>
      <button><img onClick={windowSwipe} className="w-32 hover:animate-wiggle-more mt-6" src={fingerswipe} alt="Swipe Finger" /></button>
      <p class="text-xl px-10 py-10 font-thin font-sans text-white justify-center text-center">Discover your next must-watch movies! With Movie Tinder you can like and save the movies you want to see for later. So what are you waiting for? Start swiping!</p>
    </div>

    {/* JOIN A SESSION */}
    <div className="pt-40 p-4 w-full sm:w-auto sm:flex-1 flex justify-center items-center flex-col animate-jump-in animate-delay-[900ms]">
      <h1
        disabled={loading || !sessionId}
        className="text-4xl font-thin font-sans  "
        style={{ color: "#FFFFFF", textShadow: "0px 0px 4px #FFFFFF" }}
      >
        {loading ? 'Joining...' : 'JOIN A SESSION'}
      </h1>
      <input
        type="text"
        placeholder="Enter Session ID"
        value={sessionId}
        onChange={(e) => setSessionIdState(e.target.value)}
        className="mt-6 flex border rounded py-2 px-10 text-gray-700 leading-normal focus:outline-none focus:shadow-outline "
        style={{ color: "#000000", textShadow: "0px 0px 4px #FFFFFF" }}
      />
      <img onClick={handleJoinSession} className="w-32 hover:animate-shake mt-6" src={keys} alt="Keys" />
      <p class="text-xl px-10 py-5 pb-24 font-thin font-sans text-white justify-center text-center">Have friends who have already set up a group session? Ask them to share their key ID so you can join and together start exploring movies to watch!</p>
    </div>
  </div>
</div>
  </div>
);
}
export default StartPageView;