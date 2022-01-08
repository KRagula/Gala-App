import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import Safety from './components/Safety';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import './css/App.css';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes >
          <Route exact path="" element={<Homepage />} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/safety" element={<Safety/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/explore" element={<Explore/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;