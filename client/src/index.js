import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux'
import store from './store'
import * as Types from './store/actions/types'
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken'

const token = localStorage.getItem('auth_token')
if(token) {
  setAuthToken(token)
  const decoded = jwt_decode(token)

  store.dispatch({
    type: Types.SET_USER,
    payload: {
      user: decoded
    }
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
