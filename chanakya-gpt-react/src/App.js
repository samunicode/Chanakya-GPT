import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-12 h-12 mx-auto mb-4">
            <linearGradient id="a7-main">
              <stop offset="0" stopColor="#042DFF" stopOpacity="0"></stop>
              <stop offset="1" stopColor="#042DFF"></stop>
            </linearGradient>
            <circle fill="none" stroke="url(#a7-main)" strokeWidth="30" strokeLinecap="round" strokeDasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transformOrigin="center">
              <animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="2" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform>
            </circle>
          </svg>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="App">
        {user ? <ChatPage user={user} /> : <HomePage />}
      </div>
    </ErrorBoundary>
  );
}

export default App;