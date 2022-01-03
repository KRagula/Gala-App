import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import './css/App.css';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes >
          <Route exact path="" element={<Homepage />} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
    
  );
}

export default App;
