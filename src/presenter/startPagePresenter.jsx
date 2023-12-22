import LoginView from "../views/loginView";
import { useState } from "react";
import StartPageView from "../views/startPageView";
import { Navbar } from "flowbite-react";
import NavbarView from "../views/navbarView";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSessionMembers, joinSession, leaveSession } from "../sessionSlice";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../userSlice";

//Presenter is "mellanhanden" between model and view. Presenter handles user input, updates model and view

export default
    function StartPagePresenter({firebaseModel}) {


        const user = useSelector((state) => state.user.details);
        const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
        const currentSessionId = useSelector((state) => state.session.sessionId);

        const dispatch = useDispatch();
        const navigate = useNavigate();



        useEffect(() => {
            let unsubscribe = () => {};

            if (currentSessionId) {
              unsubscribe = firebaseModel.onSessionChanged(
                currentSessionId,
                (sessionData) => {
                  // Assuming sessionData.members contains user IDs
                  fetchSessionMemberEmails(sessionData.members);
                }
              );
            }

            return () => unsubscribe(); // Cleanup the listener when the component unmounts or sessionId changes
          }, [firebaseModel, currentSessionId]);

          const fetchSessionMemberEmails = async (memberIds) => {
            try {
              const memberEmails = await Promise.all(
                memberIds.map((userId) =>
                  firebaseModel.getUserDetails(userId).then((user) => user.email)
                )
              );
              dispatch(
                setSessionMembers({
                  memberIds: memberIds,
                  emails: memberEmails.filter((email) => email != null),
                })
              );
            } catch (error) {
              console.error("Error fetching member emails:", error);
            }
          };

          const createSession = async () => {
            if (!isLoggedIn || currentSessionId) return;
            try {
              const newSessionId = await firebaseModel.createSession(user.userId);
              dispatch(joinSession({ userId: user.userId, sessionId: newSessionId })); // Update the Redux store with the new session ID

              fetchSessionMembers(newSessionId, [user.userId], dispatch, firebaseModel);
            } catch (error) {

              console.error("Error creating session:", error);
            }
          };

          async function fetchSessionMembers(
            sessionId,
            userIds,
            dispatch,
            firebaseModel
          ) {
            try {
              const members = await firebaseModel.getSessionMembers(sessionId);
              console.log(members);
              dispatch(setSessionMembers({ emails: members, memberIds: userIds })); // Assuming members is an array of member details
            } catch (error) {
              console.error("Error fetching session members:", error);
            }
          }
        
          const handleJoinSession = async (sessionId) => {
            if (!isLoggedIn || !sessionId) return;
            try {

              await firebaseModel.joinSession(sessionId, user.userId);
              dispatch(joinSession({ userId: user.userId, sessionId: sessionId })); // Update the Redux store when joining a session

              await fetchSessionMembers(
                sessionId,
                [user.userId],
                dispatch,
                firebaseModel
              );
            } catch (error) {

              console.error("Error joining session:", error);
            }
          };
        
          const handleLeaveSession = async () => {
            if (!isLoggedIn || !currentSessionId) return;
            try {
              await firebaseModel.leaveSession(currentSessionId, user.userId);
              dispatch(leaveSession()); // Update the Redux store when leaving a session

            } catch (error) {

              console.error("Error leaving session:", error);
            }
          };

          const goToLogin = () => {
            navigate("/login");
          }
        const goToSwipe = () => {
            navigate("/moviepage");
        }

        const handleSignOut = async () => {
            dispatch(logoutUser());
            await firebaseModel.logoutUser();

        };

    return <div>
        <NavbarView createSession={createSession} joinSession={handleJoinSession}  goToLogin={goToLogin} goToSwipe={goToSwipe} leaveSession={handleLeaveSession} signOut={handleSignOut}/>
        <StartPageView firebaseModel={firebaseModel} createSession={createSession} handleJoinSession={handleJoinSession} handleLeaveSession={handleLeaveSession} goToSwipe={goToSwipe} />
        </div>
};