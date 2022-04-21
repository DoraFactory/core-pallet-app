// React : core library
import React from 'react';
// ReactDOM:  渲染
import ReactDOM from 'react-dom/client';
// app global style file
import './index.css';
// import root component
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);