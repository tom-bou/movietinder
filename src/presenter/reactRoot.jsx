import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPresenter from './loginPresenter';
import RegisterPresenter from './registerPresenter';
import StartPagePresenter from './startPagePresenter';
import { store, persistor } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LikesPresenter from './likesPresenter';

import MoviePageView from './moviePagePresenter';
const ReactRoot = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<StartPagePresenter firebaseModel={props.firebaseModel} />} />
              <Route path="/login" element={<LoginPresenter firebaseModel={props.firebaseModel} />} />
              <Route path="/register" element={<RegisterPresenter firebaseModel={props.firebaseModel} />} />
              <Route path="/yourlikes" element={<LikesPresenter model={props.movieModel} firebaseModel={props.firebaseModel}  />} />
              <Route path="/moviepage" element={<MoviePageView model={props.movieModel} firebaseModel={props.firebaseModel} />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default ReactRoot;
