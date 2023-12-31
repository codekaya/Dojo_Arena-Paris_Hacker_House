import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Menu from './pages/Menu'
import Survivor from './pages/Survivor'
import Start from './pages/Start'
import Games from './pages/Games'
import HunterPunks from './pages/Hunterpunks'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import { store } from '../stores'
import Mint from './pages/Mint'
import Register from './pages/Register'
const connectors = [
  new InjectedConnector({ options: { id: 'braavos' } }),
  new InjectedConnector({ options: { id: 'argentX' } }),
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store()}>
    <React.StrictMode>
      <StarknetConfig connectors={connectors}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Menu />} />
            <Route path='/survivor' element={<Survivor />} />
            <Route path='/start' element={<Start />} />
            <Route path='/games' element={<Games />} />
            <Route path='/hunterpunks/:game_id' element={<HunterPunks />} />
            <Route path='/mint' element={<Mint />} />
            <Route path='/register/:game_id' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </StarknetConfig>
    </React.StrictMode>
    ,
  </Provider>,
)
