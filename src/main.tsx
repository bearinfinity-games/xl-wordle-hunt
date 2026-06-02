import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/Tiles.css'
import './styles/Keyboard.css'
import App from './App.tsx'
import {WordleContextProvider} from './context/WordleContext.tsx'

createRoot(document.getElementById('root')!).render(
  <WordleContextProvider>
    <App />
  </WordleContextProvider>,
)
