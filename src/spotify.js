// Get the spotify client ID from environment variable
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000';

// Scopes for Spotify API access
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read'
];

// Generate random string for state parameter
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

// Create the authorization URL
export const getAuthUrl = () => {
  const state = generateRandomString(16);
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: SCOPES.join(' ')
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

// Parse the access token from URL hash
export const getTokenFromUrl = () => {
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
  
  window.location.hash = '';
  return hash;
};
