import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WalletApp from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletApp />
  </StrictMode>
);
