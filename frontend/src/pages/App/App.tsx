import React from 'react';
import CreateMember from '../CreateMember/CreateMember';
import Home from '../Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member/create" element={<CreateMember />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
