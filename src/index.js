import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './app/store';

const routerBaseName = process.env.PUBLIC_URL;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={routerBaseName}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
