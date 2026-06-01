import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Tiles.css'
import './Keyboard.css'
import App from './App.tsx'
import {WordleContextProvider} from './WordleContext.tsx'

createRoot(document.getElementById('root')!).render(
  <WordleContextProvider>
    <App />
  </WordleContextProvider>,
)
