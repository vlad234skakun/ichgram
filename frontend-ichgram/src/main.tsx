import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from "redux-persist/integration/react"

import { persistor, store } from './redux/store.js'

import App from './modules/App.js'
import "./shared/styles/style.css"

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <App />

      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </StrictMode>
)
