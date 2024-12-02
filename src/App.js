import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-xl text-gray-600">This web app was built by Marc's Agent</p>
        <div className="mt-6 text-sm text-gray-500">Created with ❤️ using React</div>
      </div>
    </div>
  );
}

export default App;