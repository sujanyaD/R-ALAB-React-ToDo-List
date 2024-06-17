import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './ToDoApp.jsx'
import './index.css'
import ToDoApp from './ToDoApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToDoApp />
  </React.StrictMode>,
)
