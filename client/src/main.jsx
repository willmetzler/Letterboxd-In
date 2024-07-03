import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Watchlist from './components/Watchlist.jsx'
import Contact from './components/Contact.jsx'
import Diary from './components/Diary.jsx'

import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//ROUTES
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: "watchlist",
        element: <Watchlist />
      },
      {
        path: "diary",
        element: <Diary />
      }
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
