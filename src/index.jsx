import React from 'react';
import { createRoot } from 'react-dom/client';
import MainView from './components/MainView/MainView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const MyFlixApplication = () => {
  return (
    <div className="main-content">
      <MainView />
    </div>
  );
};

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyFlixApplication />
  </React.StrictMode>
);
