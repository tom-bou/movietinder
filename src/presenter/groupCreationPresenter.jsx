import LoginView from "../views/loginView";
import { useState } from "react";
import GroupCreationView from "../views/groupCreationView";


//Presenter is "mellanhanden" between model and view. Presenter handles user input, updates model and view

export default
    function GroupCreationPresenter(props) {
    return <GroupCreationView firebaseModel={props.firebaseModel}/>
};