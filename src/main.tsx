import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'lib-flexible/flexible'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
)
