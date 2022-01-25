import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './App.css';
import { Home } from './components/home/Home';
import { NavbarComp } from './components/nav/NavbarComp';

function App() {
  return (
    <>
     <NavbarComp />
    <Routes>
       <Route path='/' element={<Home />} />
    </Routes>
    </>
  );
}

export default App;
