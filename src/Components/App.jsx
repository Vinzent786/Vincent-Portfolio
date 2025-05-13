import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "../Context/ThemeProvider.jsx";
import { usePreloadImages } from "../Hooks/usePreloadImages.js";
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
// - Redners the client side router
// - Wraps routes with the theme provider,
// - Wraps routes with the theme wrapper (used for components outside of main path),
// - Wraps routes in the suspense provider (to render fallback UI while lazy loading components render)
export default function App() {
  // Preloads the background image for home route and theme switcher
  usePreloadImages([
    '/assets/code-cover.webp',
    '/assets/DayNightIcon.svg'
   ]);

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