import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "../Context/ThemeProvider.jsx";
import LoadingIcon from "./LoadingIcon.jsx";
import Error from "./Error.jsx";
import Layout from "./AppLayout/Layout.jsx";
import Test from "./AppLayout/Test.jsx";
// Lazy imports for loading fallback
const Home = lazy(() => import("./Home.jsx"));
const About = lazy(() => import("./AppLayout/About.jsx"));
const Exp = lazy(() => import("./AppLayout/Exp.jsx"));
const Skills = lazy(() => import("./AppLayout/Skills.jsx"));

export default function App() {
  // Client side routing
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
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
        },
        {
          path: 'test',
          element: <Test></Test>
        }
      ]
    },
    {
      path: '/error',
      element: <Error />
    }
  ]);

  return (
    <Suspense fallback={<LoadingIcon />}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Suspense>
  );
}