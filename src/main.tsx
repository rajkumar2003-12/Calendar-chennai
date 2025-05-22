import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CalendarDashboard } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarDashboard />
  </StrictMode>,
)
