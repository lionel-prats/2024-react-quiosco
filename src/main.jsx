import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom' // v258
import { QuioscoProvider } from './context/QuioscoProvider' // v273
import router from './router' // importacion de src\router.jsx (v258)
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <QuioscoProvider>
      <RouterProvider router={router} />
    </QuioscoProvider>
  // </React.StrictMode>,
)
