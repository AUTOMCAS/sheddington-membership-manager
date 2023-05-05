import React from 'react';
import CreateMember from './components/forms/CreateMemberForm/CreateMemberForm';
import Members from './pages/Members/Members';
import MemberPage from './pages/MemberPage/MemberPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/members" element={<Members />} />
        <Route path="/members/create" element={<CreateMember />} />
        <Route path="/members/:id" element={<MemberPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
