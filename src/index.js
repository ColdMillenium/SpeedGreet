import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ClientContextProvider from './contexts/ClientContext'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ClientContextProvider>
          <App />
      </ClientContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
