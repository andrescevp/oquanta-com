import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { ViteReactSSG } from 'vite-react-ssg'
import { ViteReactSSG } from 'vite-react-ssg/single-page'
// import {createRoot} from "react-dom/client";

// createRoot(document.getElementById('root')!).render(
//     <StrictMode>
//         <App />
//     </StrictMode>
// );

export const createRoot = ViteReactSSG(
  <StrictMode>
    <App />
  </StrictMode>
);
