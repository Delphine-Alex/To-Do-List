import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './components/Register/Register';
import Authentication from './components/Authentication/Authentication';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/authentication' element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
