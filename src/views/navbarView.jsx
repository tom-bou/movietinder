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
        <nav class=" font-sans rounded-sm z-10 bg-[#150629cb] fixed  top-0 flex justify-between items-center w-full py-2 px-8">
        <div class="md:static md:min-h-fit">
            <ul class="flex md:flex-row flex-col items-center md:gap-6">
            <li>
            <button><a class="text-white hover:text-pink-300" onClick={windowSwipe} style={{textShadow: "0px 0px 4px #FFFFFF" }} href="#">Swipe</a></button>
            </li>
            <li>
                {!currentSessionId &&<button><a onClick={createSession} class="text-white hover:text-pink-300" style={{textShadow: "0px 0px 4px #FFFFFF" }} href="#">Create Session</a></button>}
                {currentSessionId &&<button><a onClick={handleLeaveSession} class="text-white hover:text-pink-300" style={{textShadow: "0px 0px 4px #FFFFFF" }} href="#">Leave Session</a></button>}
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
            className="w-8 hover:animate-wiggle ml-2"
            src={keys}
            alt="Keys"
        />
        </button>}
            </li>
            </ul>
        </div>
        {!loggedIn && (
            <div class="">
                <button
                    onClick={windowLogin}
                    class="bg-[#F4D0FD] px-4 py-1 text-[#2A1547] rounded-lg"
                    style={{ textShadow: "0px 0px 2px #812789" }}
                >
                    Login
                </button>
            </div>
        )}

        {loggedIn && (
            <div class="">
                <button
                    onClick={handleSignOut}
                    class="bg-[#F4D0FD] px-4 py-1 text-[#2A1547] rounded-lg"
                    style={{ textShadow: "0px 0px 2px #812789" }}
                >
                    Sign Out
                </button>
            </div>
        )}

        </nav>
    )
}