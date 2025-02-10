import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './styles/App.css';
import { Navigation } from './components/Navigation';
import Profile from './pages/Profile';
import ChatWidget from './components/ChatWidget';
import Community from './pages/CommunityPage';
import Trade from './pages/Trade';
import Learn from './pages/Learn';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import StrategyMatchingPage from './pages/StrategyMatching';
import CommunityPage from './pages/CommunityPage';
import { CommunityMatches } from './components/CommunityMatches';
import { CommunityChatRooms } from './components/CommunityChatRooms';
import CommunityProfileForm from './components/CommunityProfileForm';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App relative min-h-screen">
          <Header />
          <Navigation />
          <main className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              } />
              <Route path="/learn" element={<Learn />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route 
                path="/strategy-matching" 
                element={
                  <ProtectedRoute>
                    <StrategyMatchingPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/community-chats" element={<CommunityChatRooms />} />
              <Route 
                path="/community-profile-form" 
                element={
                  <CommunityProfileForm 
                    onSubmit={async (profile) => {
                      localStorage.setItem('userProfile', JSON.stringify(profile));
                      window.location.href = '/community-matches';
                    }}
                    loading={false}
                  />
                } 
              />
              <Route 
                path="/community-matches" 
                element={
                  <CommunityMatches 
                    matches={[]}
                    onJoinCommunity={(community) => {
                      console.log('Joining community:', community);
                    }}
                    onViewAll={() => {
                      console.log('View all communities');
                    }}
                  />
                } 
              />
            </Routes>
          </main>
          <ChatWidget />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;