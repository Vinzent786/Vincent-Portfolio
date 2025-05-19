import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "../Context/ThemeProvider.jsx";
import { usePreloadImages } from "../Hooks/usePreloadImages.js"
import { inject } from "@vercel/analytics";
import ThemeWrapper from "./ThemeWrapper.jsx";
import LoadingIcon from "./LoadingIcon.jsx";
import Error from "./Error.jsx";
import Layout from "./AppLayout/Layout.jsx";
import Home from "./Home.jsx";
// Lazy imports for loading fallback
const About = lazy(() => import("./AppLayout/About.jsx"));
const Exp = lazy(() => import("./AppLayout/Exp.jsx"));
const Skills = lazy(() => import("./AppLayout/Skills.jsx"));

// Client side router
// Handles what to render based on path, and provides an error component on errors
const router = createBrowserRouter([
  {
    path: '/',
    element: <ThemeWrapper><Home /></ThemeWrapper>,
    errorElement: <Error />,
  }, 
  {
    path: '/main',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'exp',
        element: <Exp />
      },
      {
        path: 'skills',
        element: <Skills />
      }
    ]
  },
  {
    path: '/error',
    element: <ThemeWrapper><Error /></ThemeWrapper>
  }
]);

// Main application component that:
// - Renders the client side router
// - Wraps routes with the theme provider,
// - Wraps routes with the theme wrapper (used for components outside of main path),
// - Wraps routes in the suspense provider (to render fallback UI while lazy loading components render)
export default function App() {
  // Preloads images for components
  usePreloadImages([
    '/assets/code-cover.webp',
    '/assets/DayNightIcon.svg',
    '/assets/front-end-dev.webp',
    '/assets/back-end-dev.webp',
    '/assets/system-admin.webp',
    '/assets/triforce-icon.png'
   ]);

   // used for Vercel analytics
   useEffect(() => inject(), []);

  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Suspense fallback={<LoadingIcon />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
