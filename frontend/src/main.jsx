import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register PWA Service Worker with dynamic base path
if ('serviceWorker' in navigator && !window.location.host.startsWith('localhost')) {
  window.addEventListener('load', () => {
    const swPath = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swPath)
      .then((reg) => console.log('✅ PGI Saathi Service Worker registered successfully at:', reg.scope))
      .catch((err) => console.warn('Service Worker registration warning:', err));
  });
}
