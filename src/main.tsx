import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ServiceWorkerModule from './ServiceWorkerModule';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ServiceWorkerModule />
  </StrictMode>,
)
