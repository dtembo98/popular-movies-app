import * as React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {ThemeProvider} from "styled-components"

import {Home, NoInternet, ErrorBoundary, NoPage} from "./containers"
import {customTheme} from "./theme/palette"

import {Provider} from "react-redux"
import {persistor, store} from "./store"
import {PersistGate} from "redux-persist/integration/react"

import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ThemeProvider theme={customTheme}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/liked' element={<Home />} />
                <Route path='/no-connection' element={<NoInternet />} />
                <Route path='*' element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  )
}

export default App
