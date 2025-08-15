import React, { useState, useEffect } from 'react';

const AuthFailedPage = () => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const redirectToHome = () => {
    window.location.href = '/';
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 py-2"
      style={{
        backgroundColor: '#e5e5f7',
        opacity: 0.8,
        backgroundImage: 'radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      }}
    >
      <div className="max-w-md mx-4 md:mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <img src="assets/img/black_logo.png" className="w-36 mx-auto pb-4" alt="ChanakyaGPT Logo" />
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Authentication Failed</div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              Please Login First to access the application.
            </h1>
            <p className="mt-2 text-gray-500">
              You are being redirected to the Login Page in{' '}
              <span className="font-bold text-red-500">{countdown}</span> seconds...
            </p>
            <button 
              onClick={redirectToHome}
              className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
            >
              Go to Home Page Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFailedPage;