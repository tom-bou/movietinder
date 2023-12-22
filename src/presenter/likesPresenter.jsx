import { observer } from 'mobx-react-lite';
import { useState } from "react";
import LikedMoviesView from '../views/likesView';

export default 
    function LikesPresenter(props) {
    
    return (
        <div>
            <LikedMoviesView/>
        </div>
        );


};


