import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './index.css';

// Если пользователь зашел на /infrastructure без слэша и сервер вернул fallback SPA:
if (typeof window !== 'undefined' && window.location.pathname === '/infrastructure') {
  window.location.replace('/infrastructure/' + window.location.search + window.location.hash);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
