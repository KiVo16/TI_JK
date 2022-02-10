import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals';
import GlobalReducer from './redux/GlobalReducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

export type AppReduxState = {
  global: typeof GlobalReducer;


}

const rootReducer = combineReducers<AppReduxState>({ global: GlobalReducer })

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
