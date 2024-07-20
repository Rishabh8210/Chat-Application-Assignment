import React from 'react';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatList from './components/ChatList';
import Profile from './components/Profile';
import ChatPage from './components/ChatPage';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chats" element={<ChatList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
      </Router>
  );
}

export default App;
