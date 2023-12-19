import ReactRoot from './presenter/reactRoot.jsx';
import { createRoot } from 'react-dom/client';
import firebase from './models/firebaseModel.js';
import model from "./models/movieModel.js";
import "./models/movieSource.js";
import React from "react";
import ReactDOM from "react-dom";
import { observable, configure, reaction } from "mobx";


const container = document.getElementById('root');


configure({ enforceActions: "never" }); // we don't use Mobx actions
const reactiveModel = observable(model);

reactiveModel.doRandomMovieSearch(Math.floor(Math.random() * Math.floor(869835)));

const root = createRoot(container);
root.render(<ReactRoot firebaseModel={firebase} movieModel={reactiveModel}/>);