import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import App from './components/app/app';

import createApi from './services/api';

import {fetchOffers, checkAuth} from './store/api-actions';
import {requireAuthorization} from './store/action';
import {AuthorizationStatus} from './const';
import redirect from './store/redirect';
import rootReducer from './store/root-reducer';

import offers from '../src/mock/offers';
import comments from '../src/mock/comments';

const COUNT_NEAR_OFFER = 3;

const onUnauthorized = () => store.dispatch(
  requireAuthorization(AuthorizationStatus.NO_AUTH));

const api = createApi(onUnauthorized);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        nearOffers={offers.slice(0, COUNT_NEAR_OFFER)}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
