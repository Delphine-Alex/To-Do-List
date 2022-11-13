import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import MyList from './components/MyList/MyList';
import Profil from './components/Profil/Profil';
import Register from './components/Register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/authentication' element={<Authentication />} />
        <Route path='/task' element={<MyList />} />
        <Route path='/profil' element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
