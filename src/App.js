import React, { useEffect, useState } from 'react';
import { getAuthUrl, getTokenFromUrl } from './spotify';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    
    if (_token) {
      setToken(_token);
      fetchProfile(_token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full transform transition-transform duration-300 hover:scale-105">
        {!token ? (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
            <p className="text-xl text-gray-600 mb-6">Login with your Spotify account to continue</p>
            <a 
              href={getAuthUrl()}
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Login with Spotify
            </a>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {profile ? `Welcome, ${profile.display_name}!` : 'Loading...'}
            </h1>
            {profile && (
              <div className="space-y-4">
                <p className="text-xl text-gray-600">{profile.email}</p>
                {profile.images?.[0]?.url && (
                  <img 
                    src={profile.images[0].url} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full mx-auto"
                  />
                )}
                <p className="text-gray-500">Spotify ID: {profile.id}</p>
              </div>
            )}
          </>
        )}
        <div className="mt-6 text-sm text-gray-500">Created with ❤️ using React</div>
      </div>
    </div>
  );
}

export default App;