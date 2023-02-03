import React from 'react';
import CreateMember from '../CreateMember/CreateMember';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 data-test="hero-heading" className="heading">
        Sheddington Membership Manager
      </h1>
      <CreateMember />
    </div>
  );
};
export default App;
