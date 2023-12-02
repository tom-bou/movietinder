import LoginView from "../views/loginView";
import { observer } from "mobx-react-lite";
import { useState } from "react";


//Presenter is "mellanhanden" between model and view. Presenter handles user input, updates model and view

export default
observer( 
    function LoginPresenter(props) {

        const [error, setError] = useState(null);

        const onEmailLogin = async (email, password) => {
          try {
            await props.firebaseModel.signInWithEmailPassword(email, password);
            // Handle login success (e.g., navigate to another page)
          } catch (err) {
            setError(err.message);
          }
        };
      
        const onGoogleLogin = async () => {
          try {
            await props.firebaseModel.signInWithGoogle();
            // Handle login success (e.g., navigate to another page)
          } catch (err){
            setError(err.message);
          }}
          return <LoginView onEmailLogin={onEmailLogin} onGoogleLogin={onGoogleLogin} />;
});