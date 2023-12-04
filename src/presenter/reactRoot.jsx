import React from 'react';
import { observer } from 'mobx-react-lite';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPresenter from './loginPresenter';
import RegisterPresenter from './registerPresenter';
import MoviePosterView from '../views/moviePageView';
import Movie from './moviePresenterTest';


const ReactRoot = observer((props) => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPresenter firebaseModel={props.firebaseModel} />} />
          <Route path="/register" element={<RegisterPresenter firebaseModel={props.firebaseModel} />} />
          <Route path="/movie" element={<Movie model={props.movieModel} />} />
        </Routes>

      </div>
    </Router>
  );
});

export default ReactRoot;
