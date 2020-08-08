import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './quiz3/Routes'
import IsLoginContext, { IsLoginProvider } from './IsLoginContext'

function App() {
  return (
    <IsLoginProvider>

      <Router>
        <Routes/>
      </Router>
    </IsLoginProvider>
    
  );
}

export default App;
