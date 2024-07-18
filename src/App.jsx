import React from 'react';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatList from './components/ChatList';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
