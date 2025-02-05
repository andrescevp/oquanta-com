import React, { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';
import { ViteReactSSG } from 'vite-react-ssg'
import Index from './pages/Index.tsx';
// import { ViteReactSSG } from 'vite-react-ssg/single-page'
import type { RouteRecord } from 'vite-react-ssg'
const Layout = React.lazy(() => import('./Layout'))

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/Index')),
      },
      {
        path: "/contact",
        Component: React.lazy(() => import('./pages/Contact')),
      }
    ],
  }
]


export const createRoot = ViteReactSSG(
  // react-router-dom data routes
  { routes }
);
