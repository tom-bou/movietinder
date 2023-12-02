// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import Root from "./presenter/root.jsx";
import "./models/movieSource.js";
import Movie from "./presenter/moviePresenterTest.jsx";
import model from "./models/movieModel.js";

import { observable, configure, reaction } from "mobx";
import { createRoot } from "react-dom/client";

configure({ enforceActions: "never" }); // we don't use Mobx actions
const reactiveModel = observable(model);

reactiveModel.doRandomMovieSearch(Math.floor(Math.random() * Math.floor(1000)));

createRoot(document.getElementById("root")).render(
  <Root model={reactiveModel} />
);
