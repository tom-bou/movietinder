import LoginView from "../views/loginView";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import GroupCreationView from "../views/groupCreationView";


//Presenter is "mellanhanden" between model and view. Presenter handles user input, updates model and view

export default
observer(
    function GroupCreationPresenter(props) {
    return <GroupCreationView firebaseModel={props.firebaseModel}/>
});