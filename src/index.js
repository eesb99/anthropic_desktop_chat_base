import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

console.log('Starting app...');
const container = document.getElementById('root');
console.log('Root element:', container);

if (container) {
  console.log('Creating React root...');
  const root = createRoot(container);
  console.log('Rendering app...');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}
