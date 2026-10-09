import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { resources } from './data/resources';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App resources={resources} />
  </StrictMode>,
);