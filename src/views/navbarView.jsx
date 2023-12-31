import React, { useState } from "react";
import "../style.css";
import keys from "../images/keys.png";

import { useSelector } from "react-redux";


export default function NavbarView(props) {
    const [sessionId, setSessionIdState] = useState("");
    const [loading, setLoading] = useState(false);

    const currentSessionId = useSelector((state) => state.session.sessionId);
    const loggedIn = useSelector((state) => state.user.isLoggedIn);

    function windowSwipe(event) {
        props.goToSwipe()
      }

    function windowLogin(event) {
        props.goToLogin()
      }

    async function createSession() {
        setLoading(true)
        await props.createSession()
        setLoading(false)
    }

    async function handleJoinSession() {
        setLoading(true)
        await props.joinSession(sessionId)
        setLoading(false)
    }

    async function handleSignOut() {
        setLoading(true)
        await props.signOut()
        setLoading(false)
    }
    async function handleLeaveSession() {
        setLoading(true)
        await props.leaveSession()
        setLoading(false)
    }


    return (
        <nav className=" font-sans rounded-sm z-10 bg-[#150629cb] fixed top-0 flex justify-between w-full py-2 px-8">
        <div className="md:static md:min-h-fit">
            <ul className="flex md:flex-row flex-col items-center md:gap-6">
            <li>
            <button><a className="text-white text-xs md:text-base hover:text-pink-300" onClick={windowSwipe} style={{textShadow: "0px 0px 4px #FFFFFF" }} >Swipe</a></button>
            </li>
            <li>
                {!currentSessionId && <button><a onClick={createSession} className="text-white hover:text-pink-300 text-xs md:text-base" style={{textShadow: "0px 0px 4px #FFFFFF" }}>Create Session</a></button>}
                {currentSessionId &&<button><a onClick={handleLeaveSession} className="text-white hover:text-pink-300 text-xs md:text-base" style={{textShadow: "0px 0px 4px #FFFFFF" }} href="#">Leave Session</a></button>}
            </li>
            <li>
            {currentSessionId && <h1 className="text-white" style={{textShadow: "0px 0px 4px #ffffff" }}>Current Session Id: {currentSessionId}</h1>}
            {!currentSessionId &&<button className="flex items-center">
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

            className="flex border rounded lg:px-8 px-2 text-gray-700 leading-normal focus:outline-none focus:shadow-outline"
        />
        <img
            onClick={handleJoinSession}
            className="w-6 md:w-8 hover:animate-wiggle ml-2"
            src={keys}
            alt="Keys"
        />
        </button>}
            </li>
            <li>
                {!loggedIn && 
      <div
        className="text-center py-4 text-lg text-white"
      >
        Please log in to create or join a session.
      </div>}
            </li>
            </ul>
        </div>
        {!loggedIn && (
            <div className="">
                <button
                    onClick={windowLogin}
                    className="bg-[#F4D0FD] px-4 py-1 text-[#2A1547] rounded-lg"
                    style={{ textShadow: "0px 0px 2px #812789" }}
                >
                    Login
                </button>
            </div>
        )}

        {loggedIn && (
            <div className="">
                <button
                    onClick={handleSignOut}
                    className="bg-[#F4D0FD] px-4 py-1 text-[#2A1547] rounded-lg"
                    style={{ textShadow: "0px 0px 2px #812789" }}
                >
                    Sign Out
                </button>
            </div>
        )}

        </nav>
    )
}