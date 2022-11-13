import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import Profil from './components/Profil/Profil';
import Register from './components/Register/Register';
import ToDoList from './components/ToDoList/ToDoList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/task' element={<ToDoList />} />
        <Route path='/profil' element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
