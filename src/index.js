import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './store';
import setupInterceptors from "./services/setupInterceptors";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // The App component needs to be a child of Provider for Redux to work
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// This intercepts any api calls and handles it when a token is expired.
setupInterceptors(store);


