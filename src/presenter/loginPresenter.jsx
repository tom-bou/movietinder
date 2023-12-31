import LoginView from "../views/loginView";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../userSlice";
import { useDispatch } from "react-redux";

//Presenter is "mellanhanden" between model and view. Presenter handles user input, updates model and view

export default function LoginPresenter(props) {
        const navigate = useNavigate();
        const [error, setError] = useState(null);
        const dispatch = useDispatch();

        const onEmailLogin = async (email, password) => {
          try {
            const {userCredential, likedMovies} = await props.firebaseModel.signInWithEmailPassword(email, password);
            console.log(userCredential);
            dispatch(loginUser({email: userCredential.user.email, userId: userCredential.user.uid, likedMovies: likedMovies }));
            navigate('/');
            console.log("Logged in with email");
          } catch (err) {
            setError(err.message);
            console.log(error)
          }
        };
        const onGoogleLogin = async () => {
          try {
            const {userCredential, likedMovies} = await props.firebaseModel.signInWithGoogle();
            dispatch(loginUser({email: userCredential.user.email, userId: userCredential.user.uid, likedMovies: likedMovies }));
            navigate('/');
            console.log("Logged in with google");
            return userCredential;
          } catch (err){
            setError(err.message);
            console.log(error)
          }}
          return <LoginView onEmailLogin={onEmailLogin} onGoogleLogin={onGoogleLogin} />;
};