import React from 'react';
import AddMember from './pages/AddMember/AddMember';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/add" element={<AddMember />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
