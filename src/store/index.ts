import {configureStore} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"
import logger from "redux-logger"
import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly"

import rootReducer from "./rootReducer"
const persistConfig = {
  key: "root",
  storage,
  // Add Redux reducers to be whitelisted here
  whitelist: ["auth"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    const customizedMiddleWare = getDefaultMiddleware({
      serializableCheck: false,
    })
    return customizedMiddleWare.concat(logger)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export const persistor = persistStore(store)
