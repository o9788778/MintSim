import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// bypass ngrok warning
window.fetch = ((origFetch) => {
  return async (...args) => {

    if (typeof args[0] === 'string' &&
        args[0].includes('ngrok-free.dev')) {

      args[1] = args[1] || {};

      args[1].headers = {
        ...(args[1].headers || {}),
        'ngrok-skip-browser-warning': 'true'
      };
    }

    return origFetch(...args);
  };
})(window.fetch);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)