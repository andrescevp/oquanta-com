import React from 'react'
import './index.css'
import { ViteReactSSG } from 'vite-react-ssg'

// import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { pages } from './BlogEntries.ts'

import type { RouteRecord } from 'vite-react-ssg'
const Layout = React.lazy(() => import('./Layout'))

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: React.lazy(() => import('./pages/Index'))
      },
      {
        path: '/contact',
        Component: React.lazy(() => import('./pages/Contact'))
      },
      {
        path: '/blog',
        Component: React.lazy(() => import('./pages/BlogEntries'))
      },
      {
        path: '/blog/:slug',
        Component: React.lazy(() => import('./pages/BlogEntry')),
        getStaticPaths: () => Object.keys(pages).map(slug => `/blog/${slug}`)
      },
      {
        path: '/not-found',
        Component: React.lazy(() => import('./pages/NotFound'))
      },
      {
        path: '*',
        Component: React.lazy(() => import('./pages/NotFound'))
      }
    ]
  }
]

export const createRoot = ViteReactSSG(
  // react-router-dom data routes
  { routes }
  // (context: ViteReactSSGContext<true>) => {
  //   const { routes } = context
  //   console.log(routes)
  //   routes.forEach((route) => {
  //     route.children?.forEach((child) => {
  //       console.log(child)
  //     })
  //   });
  // },
)
