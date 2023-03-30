import React from 'react';
import CreateMember from './components/forms/CreateMemberForm/CreateMemberForm';
import Members from './pages/Members/Members';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/members" element={<Members />} />
        <Route path="/members/create" element={<CreateMember />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
