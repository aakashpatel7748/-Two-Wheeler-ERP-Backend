import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from "react-redux"
import { BrowserRouter, RouterProvider } from 'react-router-dom'
// import Router from './Routes/Router.jsx'
import Router from "./Routes/Router.jsx"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={Router}/>
  </Provider>
)
