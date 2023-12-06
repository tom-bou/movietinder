import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPresenter from './loginPresenter';
import RegisterPresenter from './registerPresenter';
import MoviePosterView from '../views/moviePageView';
import GroupCreationPresenter from './groupCreationPresenter';
import { store, persistor } from '../store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
            </Routes>

          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default ReactRoot;
