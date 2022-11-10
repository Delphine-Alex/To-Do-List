import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './components/Register/Register';
import Authentication from './components/Authentication/Authentication';
import ToDoList from './components/ToDoList/ToDoList/ToDoList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/task' element={<ToDoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
