import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPresenter from './loginPresenter';
import RegisterPresenter from './registerPresenter';
import GroupCreationPresenter from './groupCreationPresenter';
import { store, persistor } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LikesPresenter from './likesPresenter';
import Movie from './moviePresenterTest';
import MoviePageView from './moviePagePresenter';
const ReactRoot = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div>
            <Routes>
              <Route path="/login" element={<LoginPresenter firebaseModel={props.firebaseModel} />} />
              <Route path="/register" element={<RegisterPresenter firebaseModel={props.firebaseModel} />} />
              <Route path="/groupCreation" element={<GroupCreationPresenter firebaseModel={props.firebaseModel}/>} />
              <Route path="/yourlikes" element={<LikesPresenter firebaseModel={props.firebaseModel} />} />
              <Route path="/movie" element={<Movie model={props.movieModel} />} />
              <Route path="/moviepage" element={<MoviePageView model={props.movieModel} />} />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default ReactRoot;
