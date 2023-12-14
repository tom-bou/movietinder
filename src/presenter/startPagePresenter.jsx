import LoginView from "../views/loginView";
import { useState } from "react";
import StartPageView from "../views/startPageView";


//Presenter is "mellanhanden" between model and view. Presenter handles user input, updates model and view

export default
    function StartPagePresenter(props) {
    return <StartPageView firebaseModel={props.firebaseModel}/>
};